#include <SliderStateService.h>

SliderStateService::SliderStateService(AsyncWebServer* server,
                                     SecurityManager* securityManager) :
    _httpEndpoint(SliderState::read,
                  SliderState::update,
                  this,
                  server,
                  LIGHT_SETTINGS_ENDPOINT_PATH,
                  securityManager,
                  AuthenticationPredicates::IS_AUTHENTICATED),
    _webSocket(SliderState::read,
               SliderState::update,
               this,
               server,
               LIGHT_SETTINGS_SOCKET_PATH,
               securityManager,
               AuthenticationPredicates::IS_AUTHENTICATED) 
{
  
}

void SliderStateService::begin() {
  
}