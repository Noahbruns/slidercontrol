#include <TMC2130Stepper.h>
#include <TMC2130Stepper_REGDEFS.h>
#include <AccelStepper.h>
#include <gcode.h>

/* Slider */
#define EN_PIN    9   
#define DIR_PIN   5   
#define STEP_PIN  6    
#define STOP_PIN  8

#define CS_PIN    10   
#define MOSI_PIN  11 
#define MISO_PIN  12 
#define SCK_PIN   13  

#define TX_PIN    2
#define RX_PIN    3 

constexpr uint32_t microseps        = 256; 
constexpr float steps_per_mm_float  = 6.83;
constexpr float max_speed           = 20; // mm/s
constexpr float acceleration        = 10; // mm/s²
constexpr uint32_t steps_per_mm = steps_per_mm_float * microseps;

uint32_t MAX_UP   = 1100;
uint32_t MAX_DOWN = 0;

TMC2130Stepper driver = TMC2130Stepper(EN_PIN, DIR_PIN, STEP_PIN, CS_PIN, MOSI_PIN, MISO_PIN, SCK_PIN);
AccelStepper stepper = AccelStepper(stepper.DRIVER, STEP_PIN, DIR_PIN);

void homing();
commandscallback commands[1] = {{"G28",homing}};
gcode Commands(1,commands);

void setup() {
  //SPI.begin();
  Commands.begin();

  Serial.println("Start...");
  pinMode(CS_PIN, OUTPUT);
  digitalWrite(CS_PIN, HIGH);
  driver.begin();             // Initiate pins and registeries
  driver.rms_current(600);    // Set stepper current to 600mA. The command is the same as command TMC2130.setCurrent(600, 0.11, 0.5);
  driver.stealthChop(1);      // Enable extremely quiet stepping
  driver.stealth_autoscale(1);
  driver.microsteps(microseps);

  stepper.setMaxSpeed(max_speed * steps_per_mm);
  stepper.setEnablePin(EN_PIN);
  stepper.setPinsInverted(false, false, true);
  stepper.enableOutputs();

  // Homing
  pinMode(STOP_PIN, INPUT);

  //set high acceleration for rapid breaking
  stepper.setAcceleration(1000 * steps_per_mm);

  Serial.println("Home...");

  stepper.move(-1500 * steps_per_mm);

  while (digitalRead(STOP_PIN) == 0) {
    stepper.run();
  }

  stepper.move(10 * steps_per_mm);

  while (stepper.distanceToGo() != 0) {
    stepper.run();
  }

  stepper.setCurrentPosition(0);
  stepper.setAcceleration(acceleration * steps_per_mm);

  Serial.println("Done!");
}


void homing()
{
  stepper.setCurrentPosition(0);
}

void loop() {
  if(Commands.available())
  { 
    if(Commands.availableValue('X')) {
      stepper.moveTo(Commands.GetValue('F'));
    }
    if(Commands.availableValue('F')) {
      stepper.setAcceleration(Commands.GetValue('F') * steps_per_mm);
    }
  }

  stepper.run();
}
