package es.urjc.ramstudios.dlabyrinth;

public class Bala {
	//private long idServer;
	private int idJug; //id para identificar de quien es la bala
	private float directionX;
	private float directionY;
	
	public Bala() {}
	
	public int getIdJug() {
		return idJug;
	}

	public void setIdJug(int idJugador) {
		this.idJug = idJugador;
	}

	public float getDirectionX() {
		return directionX;
	}

	public void setDirectionX(float direccionX) {
		this.directionX = direccionX;
	}

	public int getDirectionY() {
		return directionY;
	}

	public void setDirectionY(float direccionY) {
		this.directionY = direccionY;
	}
/*
	public long getIdServer() {
		return idServer;
	}

	public void setIdServer(long idServer) {
		this.idServer = idServer;
	}
	
	*/
	@Override
	public String toString() {
		return "{\"idJug\":"+this.idJug+",\"directionX\":"+this.directionX+",\"directionY\":"+this.directionY+"}";
	}
}
