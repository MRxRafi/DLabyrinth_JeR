package es.urjc.ramstudios.dlabyrinth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
//import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
/*
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
*/
public class GameController {

	Map<Long, Jugador> players = new ConcurrentHashMap<>();
	List<Bala> balas = new ArrayList<>();
	
	AtomicLong nextId = new AtomicLong(0);
	
	TimeManager time = new TimeManager(); //Timer del mapa con su gestión de cierre de zonas
	boolean startTimer = false;
	
	Items items = new Items();
	
	//Bala bala = new Bala();

	//COSAS DE JUGADOR
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
			nextId.decrementAndGet();
		}
	}
	
	public void updatePlayer(Jugador updPlayer) {
		players.put(updPlayer.getId(), updPlayer);
	}
	
	//COSAS DEL MAPA
	public void startTimer() {
		//Señal que inicia el timer. Debe enviarlo un solo jugador
		time.start();
		startTimer = true;
	}
	
	public TimeManager getTimer() {
		TimeManager savedTimer = time;
		return savedTimer;
	}
	
	public boolean getStartTimer() {
		boolean strTimer = startTimer;
		return strTimer;
	}
	
	//ITEMS
	public String[] getWeaponType() {
		return items.getWeaponTypes();
	}
	
	public void setWeaponType(String[] types) {
		items.setWeaponTypes(types);
	}
	
	public int[][] getWeaponPos() {
		return items.getWeaponPos();
	}
	
	public void setWeaponPos(int[][] pos) {
		items.setWeaponPos(pos);
		//system.out.println()
	}
	
	public String[] getAmmoType() {
		return items.getAmmoTypes();
	}

	public void setAmmoType(String[] types) {
		items.setAmmoTypes(types);
	}
	
	public int[][] getAmmoPos() {
		return items.getAmmoPos();
	}
	
	public void setAmmoPos(int[][] pos) {
		items.setAmmoPos(pos);
	}
	
	public int[][] getShieldPos() {
		return items.getShieldPos();
	}

	public void setShieldPos(int[][] pos) {
		items.setShieldPos(pos);
	}
	
	public int[][] getFoodPos() {
		return items.getFoodPos();
	}

	public void setFoodPos(int[][] pos) {
		items.setFoodPos(pos);
	}
	
	public String getBalasString(long id) {
		String b = "[";
		for(int i = 0; i < balas.size(); i++) {
			b += balas.get(i).toString();
			if(id != balas.get(i).getIdJug()) {
				balas.remove(i);
			}
			if(i < balas.size()-1) {
				b+= ",";
			}
		}
		b+="]";
		return b;
	}
}
