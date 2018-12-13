package es.urjc.ramstudios.dlabyrinth;

public class Bala {
	//private long idServer;
	private int idJug; //id para identificar de quien es la bala
	private int directionX;
	private int directionY;
	
	public Bala() {}
	
	public int getIdJug() {
		return idJug;
	}

	public void setIdJug(int idJugador) {
		this.idJug = idJugador;
	}

	public int getDirectionX() {
		return directionX;
	}

	public void setDirectionX(int direccionX) {
		this.directionX = direccionX;
	}

	public int getDirectionY() {
		return directionY;
	}

	public void setDirectionY(int direccionY) {
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
