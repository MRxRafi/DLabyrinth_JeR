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
	
	public void updatePlayer(long id, int posX, int posY, int velX, int velY, boolean win, double lifePoints, double shield, boolean hasOrb) {
		Jugador player = new Jugador();
		player.setId(id);
		player.setPositionX(posX);
		player.setPositionY(posY);
		player.setVelX(velX);
		player.setVelY(velY);;
		player.setWin(win);
		player.setLifePoints(lifePoints);
		player.setShield(shield);
		players.put(id, player);
	}
}
