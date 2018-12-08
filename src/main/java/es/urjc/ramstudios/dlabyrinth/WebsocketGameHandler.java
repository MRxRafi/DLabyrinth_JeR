package es.urjc.ramstudios.dlabyrinth;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.Timer;
import java.util.TimerTask;

public class WebsocketGameHandler extends TextWebSocketHandler {

	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	ObjectMapper mapper = new ObjectMapper();
	boolean debug = true;
	GameController gameController = new GameController();
	

	// Invoked after WebSocket negotiation has succeeded and the WebSocket
	// connection is opened and ready for use.
	//@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	// Invoked after the WebSocket connection has been closed by either side, or
	// after a transport error has occurred. Although the session may technically
	// still be open, depending on the underlying implementation, sending messages
	// at this point is discouraged and most likely will not succeed.
	//@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	// Invoked when a new WebSocket message arrives.
	//@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			//obj recibido
			JsonNode node = mapper.readTree(message.getPayload());
			//Obj a mandar
			ObjectNode json = mapper.createObjectNode();

			switch (node.get("type").asText()) {
				case "JOIN":
					if (gameController.getPlayers().size() < 2) {
						Jugador player = gameController.newPlayer();
						
						ObjectNode jsonPlayer = mapper.createObjectNode();
						jsonPlayer.put("id", player.getId());
						
						json.put("type", "PLAYER_CREATED");
						json.putPOJO("playerId", player.getId());
					} else {
						json.put("type", "GAME_COMPLETE");
					}
					session.sendMessage(new TextMessage(json.toString()));
					break;
					
				case "UPDATE":
					gameController.updatePlayer(node.get("id").asLong(), node.get("posX").asInt(), node.get("posY").asInt(), node.get("velX").asInt(), node.get("velY").asInt(), 
												node.get("win").asBoolean(), node.get("lifePoints").asDouble(), node.get("shield").asDouble(), node.get("hasOrb").asBoolean());
					int id;
					if(node.get("id").asLong() == 1) {id = 2;}else {id = 1;}
					//ObjectNode jsonPlayer = mapper.createObjectNode();
					Jugador player = gameController.getPlayer(id);
					
					json.put("id", id);
					json.put("positionX", player.getPositionX());
					json.put("positionY", player.getPositionY());
					json.put("velX", player.getVelX());
					json.put("velY", player.getVelY());
					json.put("win", player.isWin());
					json.put("lifePoints", player.getLifePoints());
					json.put("shield", player.getShield());
					json.put("hasOrb", player.isHasOrb());
					
					json.put("type", "UPDATE_STATE");
					//json.putPOJO("player", player);
					session.sendMessage(new TextMessage(json.toString()));
					break;
	
				default:
					break;
			}

		}
	}
}

