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

	@Override
	public String toString() {
		String text = "";
		String[] wt = getWeaponTypes();
		String[] at = getAmmoTypes();
		int[][] wp = getWeaponPos();
		int[][] ap = getAmmoPos();
		int[][] fp = getFoodPos();
		int[][] sp = getShieldPos();
		text += "{\"weaponTypes\": [";
		for(int i = 0; i < wt.length; i++) {
			text += "\"" + wt[i] + "\"";			
			if(i < wt.length-1) {
				text += ",";
			}
		}
		text+= "], \"weaponPos\": [";
		for(int i = 0; i < wp.length; i++) {
			text += "[";
			for(int j = 0; j < wp[i].length; j++) {
				text += wp[i][j];
				if(j < 1) {
					text += ",";
				}
			}
			text += "]";
			if(i < wp.length-1) {
				text += ",";
			}
		}
		text+= "], \"ammoTypes\": [";
		for(int i = 0; i < at.length; i++) {
			text += "\"" + at[i] + "\"";
			if(i < at.length-1) {
				text += ",";
			}
		}
		text+= "], \"ammoPos\": [";
		for(int i = 0; i < ap.length; i++) {
			text += "[";
			for(int j = 0; j < ap[i].length; j++) {
				text += ap[i][j];
				if(j < 1) {
					text += ",";
				}
			}
			text += "]";
			if(i < ap.length-1) {
				text += ",";
			}
		}
		text+= "], \"shieldPos\": [";
		for(int i = 0; i < sp.length; i++) {
			text += "[";
			for(int j = 0; j < sp[i].length; j++) {
				text += sp[i][j];
				if(j < 1) {
					text += ",";
				}
			}
			text += "]";
			if(i < sp.length-1) {
				text += ",";
			}
		}
		text+= "], \"foodPos\": [";
		for(int i = 0; i < fp.length; i++) {
			text += "[";
			for(int j = 0; j < fp[i].length; j++) {
				text +=fp[i][j];
				if(j < 1) {
					text += ",";
				}
			}
			text += "]";
			if(i < fp.length-1) {
				text += ",";
			}
		}
		text += "]}";
		
		return text;
	}
}
