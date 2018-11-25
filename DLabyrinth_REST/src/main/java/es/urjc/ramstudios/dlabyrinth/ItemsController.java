package es.urjc.ramstudios.dlabyrinth;

//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/items")
public class ItemsController {
	
	private Items items = new Items();
	private boolean done = false;
	
	@GetMapping("/weaponType")
	public String[] getWeaponType() {
		return items.getWeaponTypes();
	}
	
	@PostMapping("/weaponType")
	@ResponseStatus(HttpStatus.CREATED)
	public void setWeaponType(@RequestBody String[] types) {
		items.setWeaponTypes(types);
	}
	
	@GetMapping("/weaponPos")
	public int[][] getWeaponPos() {
		return items.getWeaponPos();
	}
	
	@PostMapping("/weaponPos")
	@ResponseStatus(HttpStatus.CREATED)
	public void setWeaponPos(@RequestBody int[][] pos) {
		items.setWeaponPos(pos);
	}
	
	@GetMapping("/ammoType")
	public String[] getAmmoType() {
		return items.getAmmoTypes();
	}
	
	@PostMapping("/ammoType")
	@ResponseStatus(HttpStatus.CREATED)
	public void setAmmoType(@RequestBody String[] types) {
		items.setAmmoTypes(types);
	}
	
	@GetMapping("/ammoPos")
	public int[][] getAmmoPos() {
		return items.getAmmoPos();
	}
	@PostMapping("/ammoPos")
	@ResponseStatus(HttpStatus.CREATED)
	public void setAmmoPos(@RequestBody int[][] pos) {
		items.setAmmoPos(pos);
	}
	
	@GetMapping("/shieldPos")
	public int[][] getShieldPos() {
		return items.getShieldPos();
	}
	@PostMapping("/shieldPos")
	@ResponseStatus(HttpStatus.CREATED)
	public void setShieldPos(@RequestBody int[][] pos) {
		items.setShieldPos(pos);
	}
	
	@GetMapping("/foodPos")
	public int[][] getFoodPos() {
		return items.getFoodPos();
	}
	@PostMapping("/foodPos")
	@ResponseStatus(HttpStatus.CREATED)
	public void setFoodPos(@RequestBody int[][] pos) {
		items.setFoodPos(pos);
	}
	@GetMapping("/done")
	public boolean isDone() {
		return done;
	}
	@PostMapping("/done")
	@ResponseStatus(HttpStatus.CREATED)
	public void done(@RequestBody boolean pos) {
		done = true;
	}

}