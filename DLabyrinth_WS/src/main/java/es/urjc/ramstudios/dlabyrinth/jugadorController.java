package es.urjc.ramstudios.dlabyrinth;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/players")
public class jugadorController {
	Map<Long, Jugador> players = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public int numberPlayers() {
		return players.size();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public long nuevoJugador(@RequestBody Jugador player) {
		long id = nextId.incrementAndGet();
		player.setId(id);
		players.put(id, player);

		return player.getId();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Jugador> getJugador(@PathVariable long id) {

		Jugador savedPlayer = players.get(id);

		if (savedPlayer != null) {
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Jugador> actualizaJugador(@PathVariable long id, @RequestBody Jugador playerUpdated) {

		Jugador savedPlayer = players.get(playerUpdated.getId());

		if (savedPlayer != null) {

			players.put(id, playerUpdated);

			return new ResponseEntity<>(playerUpdated, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Jugador> borraJugador(@PathVariable long id) {

		Jugador savedPlayer = players.get(id);

		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
			nextId.set(nextId.get() - 1);
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/punch/{id}")
	public void punch(@PathVariable long id) {
		players.get(id).setPunched(true);
	}
	
	@GetMapping("/punch/{id}")
	public boolean hasPunched(@PathVariable long id) {
		boolean p = players.get(id).getPunched();
		players.get(id).setPunched(false);
		return p;
	}
}
