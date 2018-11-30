package es.urjc.ramstudios.dlabyrinth;

public class Items {
	private String [] weaponTypes;
	private int [][] weaponPos;
	
	private String [] ammoTypes;
	private int [][] ammoPos;
	
	private int [][] shieldPos;
	
	private int [][] foodPos;
	
	
	public Items() {
		weaponTypes = new String [5];
		weaponPos = new int [5][2];
		ammoTypes = new String[6];
		ammoPos = new int [5][2];
		shieldPos = new int [4][2];
		foodPos = new int [8][2];
	}
	
	public String[] getWeaponTypes() {
		return weaponTypes;
	}

	public void setWeaponTypes(String[] weaponTypes) {
		this.weaponTypes = weaponTypes;
	}

	public int[][] getWeaponPos() {
		return weaponPos;
	}

	public void setWeaponPos(int[][] weaponPos) {
		this.weaponPos = weaponPos;
	}

	public String[] getAmmoTypes() {
		return ammoTypes;
	}

	public void setAmmoTypes(String[] ammoTypes) {
		this.ammoTypes = ammoTypes;
	}

	public int[][] getAmmoPos() {
		return ammoPos;
	}

	public void setAmmoPos(int[][] ammoPos) {
		this.ammoPos = ammoPos;
	}

	public int[][] getShieldPos() {
		return shieldPos;
	}

	public void setShieldPos(int[][] shieldPos) {
		this.shieldPos = shieldPos;
	}

	public int[][] getFoodPos() {
		return foodPos;
	}

	public void setFoodPos(int[][] foodPos) {
		this.foodPos = foodPos;
	}

}