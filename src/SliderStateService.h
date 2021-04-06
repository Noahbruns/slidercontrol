#ifndef SliderStateService_h
#define SliderStateService_h

#include <HttpEndpoint.h>
#include <WebSocketTxRx.h>

#define LED_PIN 2
#define PRINT_DELAY 5000

#define LIGHT_SETTINGS_ENDPOINT_PATH "/rest/SliderState"
#define LIGHT_SETTINGS_SOCKET_PATH "/ws/SliderState"

typedef enum : int {
  STOP = 0,
  UP = 1,
  DOWN = 2,
  HOME = -1,
} SliderMode_t;

class SliderState {
 public:
  int range_min;
  int range_max;
  int position;
  int speed;
  SliderMode_t mode;
  bool bounce;


  static void read(SliderState& settings, JsonObject& root) {
    root["range_min"] = settings.range_min;
    root["range_max"] = settings.range_max;
    root["position"] = settings.position;
    root["speed"] = settings.speed;
    root["mode"] = (int) settings.mode;
    root["bounce"] = settings.bounce;
  }

  static int updatesingleInt(StateUpdateResult &update, int current, const char* name, int def, JsonObject& root) {
    long newState = root[name] | def;
    if (current != newState) {
      update = StateUpdateResult::CHANGED;
      return newState;
    }

    return current;
  }

  static bool updatesingleBool(StateUpdateResult &update, bool current, const char* name, bool def, JsonObject& root) {
    bool newState = root[name] | def;
    if (current != newState) {
      update = StateUpdateResult::CHANGED;
      return newState;
    }

    return current;
  }

  static StateUpdateResult update(JsonObject& root, SliderState& SliderState) {
    StateUpdateResult update = StateUpdateResult::UNCHANGED;

    SliderState.range_min = updatesingleInt(update, SliderState.range_min, "range_min", 0, root);
    SliderState.range_max = updatesingleInt(update, SliderState.range_max, "range_max", 2100, root);
    SliderState.speed = updatesingleInt(update, SliderState.speed, "speed", 50, root);
    SliderState.mode = (SliderMode_t) updatesingleInt(update, SliderState.mode, "mode", 0, root);
    SliderState.bounce = updatesingleBool(update, SliderState.bounce, "bounce", false, root);

    //Serial.println("State now at");
    //Serial.println(SliderState.range_max); 
    //Serial.println(SliderState.range_min); 
    //Serial.println(SliderState.speed); 

    return update;
  }
};

class SliderStateService : public StatefulService<SliderState> {
 public:
  SliderStateService(AsyncWebServer* server,
                    SecurityManager* securityManager);
  void begin();

 private:
  HttpEndpoint<SliderState> _httpEndpoint;
  WebSocketTxRx<SliderState> _webSocket;
};

#endif
