package es.urjc.ramstudios.dlabyrinth;

public class Jugador {
	private long id;
	private float positionX;
	private float positionY;
	private float velX;
	private float velY;
	private boolean win;
	private boolean punch;
	
	Jugador(){}
	
	public boolean isWin() {
		return win;
	}
	public void setWin(boolean win) {
		this.win = win;
	}
	public boolean isPunch() {
		return punch;
	}
	public void setPunch(boolean punch) {
		this.punch = punch;
	}
	public float getVelX() {
		return velX;
	}
	public void setVelX(float velX) {
		this.velX = velX;
	}
	public float getVelY() {
		return velY;
	}
	public void setVelY(float velY) {
		this.velY = velY;
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