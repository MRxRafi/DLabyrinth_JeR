package es.urjc.ramstudios.dlabyrinth;

import java.util.Timer;
import java.util.TimerTask;


//Temporizador extraído de https://stackoverflow.com/questions/3144711/find-the-time-left-in-a-settimeout por el usuario "super"
public class TimeManager {
	private int remaining = generateRandomInteger(30, 70);
	public MapHandler map = new MapHandler();
	TimerTask task = new TimerTask() {
		@Override
		public void run() {
			remaining--;
			//System.out.println(remaining);
			if (remaining == 0) {
				//Cerramos sala
				map.setClosedRoom(map.getNextRoom(), true);
				map.nextRoom();
				/*
				String debug = "";
				for(int i = 0; i < 10; i++) {
					debug += "hab: " + map.getClosedRoom(i) + " ";
				}
				System.out.println(debug);*/
				// Reiniciamos remaining si quedan habitaciones que cerrar;
				if(!map.getClosedRoom(9)) {
					remaining = generateRandomInteger(30, 70);
				} else { //Nos cargamos el timer si no quedan mas habitaciones
					timer.cancel();
				}
			}

		}
	};
	private Timer timer = new Timer(); //público para pararlo cuando se acaben salas
	
	TimeManager(){
		
	}
	
	// METODOS
	public void start() {
		timer.scheduleAtFixedRate(task, 0, 1000);
	}

	public void cancel() {
		timer.cancel();
	}

	public int getTimeLeft() { //En segundos
		return remaining;
	}

	public int[] getTimeLeftOnline() { //Devuelve el tiempo en String
		int[] calcTime = new int[2];
		
		double segundos = Math.floor(remaining%60);
		double minutos = Math.floor(remaining/60);
		calcTime[0] = (int)minutos;
		calcTime[1] = (int)segundos;
		return calcTime;
	}
	
	public int generateRandomInteger(float min, float max) {
		return (int) Math.floor(min + Math.random() * (max + 1 - min));
	}
	
	//GETTERS Y SETTERS
	public int getRemaining() {
		return remaining;
	}

	public void setRemaining(int remaining) {
		this.remaining = remaining;
	}
}

//Extraído de https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript por "Faiz Mohamed Haneef"
