package es.urjc.ramstudios.dlabyrinth;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/balas")
public class BalaController {
	Map<Long, Bala> balas = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	
	/*
	 * Devuelve el array de balas que debe pintar el usuario que lo ha invocado.
	 * Una vez devuelto, se eliminan las balas que ya se hayan enviado.
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Bala[]> getBalas(@PathVariable long id) {
		Bala[] balasLocal = new Bala[balas.size()];
		long[] removeBalas = new long[balas.size()];
		int numberToRemove = 0;
		
		for(long i = 1; i <= balas.size(); i++) {
			int idJug = balas.get(i).getIdJug();
			//System.out.println("Debug: " + idJug);
			
			if(idJug == id) { //Si el ID del jguador que disparó esa bala no es igual al que pidió las balas, se añaden
				balasLocal[(int)i-1] = balas.get(i);
				removeBalas[numberToRemove] = (int)i;
				numberToRemove++;
			}
		}

		
		//Probablemente esto de lugar a fallo
		if (balasLocal.length != 0) {
			
			//Antes de enviarlas, borramos las balas del correspondiente mapa
			for(long i = 0; i < numberToRemove; i++) {
				balas.remove(removeBalas[(int)i]);
				nextId.set(nextId.get() - 1);
			}
			
			
			
		} 
		//Devolvemos OK aunque no haya balas para evitar errores en debug
		return new ResponseEntity<>(balasLocal, HttpStatus.OK);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Bala nuevaBala(@RequestBody Bala bala) {
		long balaid = nextId.incrementAndGet();
		//bala.setIdServer(balaid);
		balas.put(balaid, bala);

		System.out.println("\nBala: \nIdJug: " + bala.getIdJug() + "\nDireccion: " + bala.getDirectionX() + " " + bala.getDirectionY());
		
		return bala;
	}
}
