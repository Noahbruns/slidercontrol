#ifndef SliderStateService_h
#define SliderStateService_h

#include <HttpEndpoint.h>
#include <WebSocketTxRx.h>

#define LED_PIN 2
#define PRINT_DELAY 5000

#define LIGHT_SETTINGS_ENDPOINT_PATH "/rest/SliderState"
#define LIGHT_SETTINGS_SOCKET_PATH "/ws/SliderState"

class SliderState {
 public:
  int range_min;
  int range_max;
  int speed;

  static void read(SliderState& settings, JsonObject& root) {
    root["range_min"] = settings.range_min;
    root["range_max"] = settings.range_max;
    root["speed"] = settings.speed;
  }

  static int updatesingle(StateUpdateResult &update, int current, const char* name, int def, JsonObject& root) {
    boolean newState = root[name] | def;
    if (current != newState) {
      update = StateUpdateResult::CHANGED;
    }

    return newState;
  }

  static StateUpdateResult update(JsonObject& root, SliderState& SliderState) {
    StateUpdateResult update = StateUpdateResult::UNCHANGED;

    SliderState.range_min = updatesingle(update, SliderState.range_min, "range_min", 0, root);
    SliderState.range_max = updatesingle(update, SliderState.range_max, "range_max", 0, root);
    SliderState.speed = updatesingle(update, SliderState.speed, "speed", 0, root);

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
