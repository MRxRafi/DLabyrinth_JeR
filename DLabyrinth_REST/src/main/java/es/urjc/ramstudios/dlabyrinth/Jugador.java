package es.urjc.ramstudios.dlabyrinth;

public class Jugador {
	private long id;
	private float positionX;
	private float positionY;
	
	public Jugador() {

	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public float getPositionX() {
		return positionX;
	}
	public void setPositionX(float positionX) {
		this.positionX = positionX;
	}
	public float getPositionY() {
		return positionY;
	}
	public void setPositionY(float positionY) {
		this.positionY = positionY;
	}
}
