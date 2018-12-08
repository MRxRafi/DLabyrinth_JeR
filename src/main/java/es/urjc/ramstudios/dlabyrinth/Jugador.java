package es.urjc.ramstudios.dlabyrinth;

public class Jugador {
	private long id;
	private float positionX;
	private float positionY;
	private float velX;
	private float velY;
	private boolean win;
	private float lifePoints = 3.0F;	//le ponemos un valor ya para que no acabe el juego nada mas empezar 
	private float shield;
	private boolean punch;
	
	//Contructor
	Jugador(){}

	/*
	private String weapon0type;
	private int weapon0ammo;
	private String weapon1type;
	private int weapon1ammo;
	*/
	private boolean hasOrb;
	
	public boolean isHasOrb() {
		return hasOrb;
	}

	public void setHasOrb(boolean hasOrb) {
		this.hasOrb = hasOrb;
	}

	public float getLifePoints() {
		return lifePoints;
	}

	public void setLifePoints(double lifePoints) {
		this.lifePoints = (float)lifePoints;
	}

	public float getShield() {
		return shield;
	}

	public void setShield(double shield) {
		this.shield = (float)shield;
	}
/*
	public String getWeapon0type() {
		return weapon0type;
	}

	public void setWeapon0type(String weapon0type) {
		this.weapon0type = weapon0type;
	}

	public int getWeapon0ammo() {
		return weapon0ammo;
	}

	public void setWeapon0ammo(int weapon0ammo) {
		this.weapon0ammo = weapon0ammo;
	}

	public String getWeapon1type() {
		return weapon1type;
	}

	public void setWeapon1type(String weapon1type) {
		this.weapon1type = weapon1type;
	}

	public int getWeapon1ammo() {
		return weapon1ammo;
	}

	public void setWeapon1ammo(int weapon1ammo) {
		this.weapon1ammo = weapon1ammo;
	}
	*/
	
	
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