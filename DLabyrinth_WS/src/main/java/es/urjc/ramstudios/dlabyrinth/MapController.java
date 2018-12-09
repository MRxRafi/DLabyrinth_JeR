package es.urjc.ramstudios.dlabyrinth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/map")
public class MapController {
	/* Aquí nos preguntamos: ¿qué información de parte del mapa (zonas que se cierran) debe llegar a los clientes?
	 * Respuesta:
	 * 1. La siguiente sala que se vaya a cerrar (para pintarla en los clientes)
	 * 2. Las salas cerradas
	 * 3. El tiempo restante para que se cierre la siguiente sala
	 */
	
	TimeManager time = new TimeManager();
	
	
	@PutMapping
	public void startTimer() {
		//Señal que inicia el timer. Debe enviarlo un solo jugador
		time.start();
	}
	
	@GetMapping
	public ResponseEntity<TimeManager> getTimer() {

		TimeManager savedTimer = time;

		if (savedTimer != null) {
			return new ResponseEntity<>(savedTimer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
