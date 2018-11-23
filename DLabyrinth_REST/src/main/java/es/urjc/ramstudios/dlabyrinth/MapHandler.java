package es.urjc.ramstudios.dlabyrinth;

public class MapHandler {
	private boolean[] closedRooms;
	private int phase;
	private int nextRoom;
	
	MapHandler(){
		closedRooms = new boolean[10];
		for(int i = 0; i < 10; i++){
			closedRooms[i] = false;
		}
		nextRoom = generateRandomInteger(0, 4);
		phase = 1;
	}
	//Métodos de nuestra clase
	public void nextRoom(){
		phase = checkPhase();
		System.out.println("Fase: " + phase);
		if(phase == 1) { nextRoom = generateRandomInteger(0, 4); }
        if(phase == 2) { nextRoom = generateRandomInteger(5, 7); }
        if(phase == 3) { nextRoom = 8; }
        if(phase == 0) { nextRoom = 9; }
        if(closedRooms[nextRoom] && phase != 0) {nextRoom();}
        //En el cliente, nextRoom hay que sumarle 6
        
        System.out.println("Próxima hab: " + nextRoom);
	}
	public int checkPhase(){
		int checkNum = 0;
        for(int i = 0; i < 10 ; i++){ 
            if(closedRooms[i]) { checkNum ++; }
        }
        if(checkNum < 5) { return 1; }
        if(checkNum >= 5 && checkNum < 8) { return 2; }
        if(checkNum == 8) { return 3; }
        if(checkNum > 8){ return 0; }
        return 0;
	}
	
	public boolean[] getClosedRooms() {
		return closedRooms;
	}
	
	public int generateRandomInteger(float min, float max) {
		  return (int)Math.floor(min + Math.random()*(max + 1 - min));
	}
	//GETTERS Y SETTERS
	public boolean getClosedRoom(int index) {
		return closedRooms[index];
	}
	public void setClosedRoom(int index, boolean close) {
		closedRooms[index] = close;
	}
	public int getPhase() {
		return phase;
	}
	public void setPhase(int p) {
		phase = p;
	}
	public int getNextRoom() {
		return nextRoom;
	}
	public void setNextRoom(int n) {
		nextRoom = n;
	}
	
	
}