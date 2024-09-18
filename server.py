from http.server import SimpleHTTPRequestHandler, HTTPServer
import json
import os
from pathlib import Path

# Ruta al archivo schedules.json
DATA_PATH = Path('./backend/data')
SCHEDULES_FILE = DATA_PATH / 'schedules.json'

class MyRequestHandler(SimpleHTTPRequestHandler):

    def _set_headers(self, content_type='application/json'):
        self.send_response(200)
        self.send_header('Content-type', content_type)
        self.end_headers()

    def do_POST(self):
        if self.path == '/schedule':
            self.handle_schedule()

    def do_GET(self):
        if self.path == '/historial':
            self.handle_historial()
        else:
            super().do_GET()

    def handle_schedule(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            new_schedule = json.loads(post_data)

            # Verificar que los campos están presentes
            address = new_schedule.get('address')
            materials = new_schedule.get('materials')

            # Agregar logs para verificar los datos recibidos
            print('Datos recibidos:', new_schedule)

            if not address or not materials:
                self.send_error(400, 'Error: Datos incompletos (falta dirección o materiales)')
                return

            # Asegurarse de que el archivo existe
            if not os.path.exists(SCHEDULES_FILE):
                with open(SCHEDULES_FILE, 'w') as file:
                    json.dump([], file)

            # Leer el archivo existente
            with open(SCHEDULES_FILE, 'r+') as file:
                schedules = json.load(file)
                schedules.append({
                    'date': new_schedule.get('date'),
                    'address': address,
                    'materials': materials
                })

                # Escribir los datos actualizados en el archivo
                file.seek(0)
                file.truncate()
                json.dump(schedules, file, indent=4)

            self._set_headers()
            self.wfile.write(json.dumps({'status': 'Success'}).encode())
        except Exception as e:
            print(f"Error procesando la solicitud: {e}")
            self.send_error(500, f"Error procesando la solicitud: {e}")

    def handle_historial(self):
        try:
            # Verificar si el archivo schedules.json existe
            if os.path.exists(SCHEDULES_FILE):
                with open(SCHEDULES_FILE, 'r') as file:
                    schedules = json.load(file)

                # Enviar los datos del historial al cliente
                self._set_headers()
                self.wfile.write(json.dumps(schedules).encode())
            else:
                self.send_error(404, 'El archivo de historial no existe.')
        except Exception as e:
            print(f"Error procesando la solicitud de historial: {e}")
            self.send_error(500, f"Error procesando el historial: {e}")

if __name__ == "__main__":
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, MyRequestHandler)
    print("Server running on port 8000...")
    httpd.serve_forever()
