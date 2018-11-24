package es.urjc.ramstudios.dlabyrinth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/item")
public class ItemController {
	
	private Weapon[] weapons = new Weapon[10];
	private int it = 0;
	
	@GetMapping
	public ResponseEntity<Weapon> getWeapons(int i) {
		return new ResponseEntity<>(weapons[i], HttpStatus.OK);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void addWeapon(@RequestBody String s) {
		this.weapons[it].setType(s);
		it++;
	}
	
}

