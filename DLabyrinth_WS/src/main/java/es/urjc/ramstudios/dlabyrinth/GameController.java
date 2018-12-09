package es.urjc.ramstudios.dlabyrinth;

import java.util.Collection;
import java.util.Map;
//import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class GameController {

	Map<Long, Jugador> players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);

	public Collection<Jugador> getPlayers() {
		return players.values();
	}
	
	public Jugador getPlayer(long id) {
		return  players.get(id);
	}

	public Jugador newPlayer() {
		Jugador player = new Jugador();
		long id = nextId.incrementAndGet();
		player.setId(id);
		players.put(player.getId(), player);
		return player;
	}

	public void deletePlayer(long id) {
		Jugador savedPlayer = players.get(id);
		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
		}
	}
	
	public void updatePlayer(Jugador updPlayer) {
		players.put(updPlayer.getId(), updPlayer);
	}
}
