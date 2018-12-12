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
import com.google.gson.*;

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
						gameController.newPlayer();
						
						json.put("type", "PLAYER_CREATED");
						json.putPOJO("players", gameController.getPlayers());
					} else {
						json.put("type", "GAME_COMPLETE");
					}
					session.sendMessage(new TextMessage(json.toString()));
					break;
					
				case "UPDATE":
					/* ACTUALIZACIÓN JUGADOR */
					String textUpdPlayer = node.get("actualPlayer").toString();
					Gson gson = new Gson();
					Jugador updPlayer = gson.fromJson(textUpdPlayer , Jugador.class);
					
					gameController.updatePlayer(updPlayer);
					/* FIN ACTUALIZACIÓN JUGADOR */
					
					/* MAPA */
					if(node.get("startedTimer").asBoolean() && !gameController.getStartTimer()) { //Si aún no se ha iniciado el temporizador y se actualiza el jugador 1 lo iniciamos
						gameController.startTimer();
					}
					/*  FIN MAPA */
					
					/* ACTUALIZACIÓN ITEMS */
					if(node.get("sendItems").asBoolean()) {
						//json.put("type", "ITEMS");
						json.putPOJO("items", gameController.items);
						//session.sendMessage(new TextMessage(json.toString()));
					}
					/* FIN ACTUALIZACIÓN ITEMS */
					json.put("type", "UPDATE_STATE");
					json.putPOJO("players", gameController.getPlayers());
					json.putPOJO("map", gameController.getTimer());
					session.sendMessage(new TextMessage(json.toString()));
					break;
				
				case "MATCHING":
					json.put("type", "MATCHING_STATE");
					json.putPOJO("players", gameController.getPlayers());
					session.sendMessage(new TextMessage(json.toString()));
					break;
				case "ITEMS": 
					String updateItemsText = node.get("items").toString();
					Gson gsonIt = new Gson();
					gameController.items = gsonIt.fromJson(updateItemsText, Items.class);
				default:
					break;
			}

		}
	}
}

