
const ADOPTIONSTATE = {
  FOR_ADOPTION:"En adopción responsable",
  IN_PROCESS:"Proceso de adopción en curso",
  ADOPTED:"Adoptado!"
}

const TEMPERAMENT = {
  CALM: "Tranquilito",
  FEARFUL: "Temeroso",
  PLAYFUL: "Juguetón",
  CHILDLIKE: "Cachorrón y medio loco",
  NERVOUS: "Nervioso",
  HOT_TEMPERED: "Irascible"
}

class Dogs {

    constructor(name, breed, size, requirements, adoptionState) {
      this.name = name;
      this.breed = breed;
      this.size = size;
      this.requirements = requirements ? requirements.split(", ") : null;
      this.adoptionState = adoptionState ? adoptionState : ADOPTIONSTATE.FOR_ADOPTION;
    }
  
    play() {
      let juego;
      if(this.size<25)
        juego="Juego adentro de la casa ";
      else
        juego="Juego en el Jardín ";
  
      switch(this.temperament)
      {
        case TEMPERAMENT.CALM:
          juego=juego.concat("Pero me canso rápido");
          break;
        case TEMPERAMENT.FEARFUL:
          juego=juego.concat("Pero me asusto si veo un extraño");
        break;
        case TEMPERAMENT.PLAYFUL:
          juego=juego.concat("Pero cuando empiezo no me para nadie");
          break;
        case TEMPERAMENT.CHILDLIKE:
          juego=juego.concat("Pero me llevo por delante todo");
          break;
        case TEMPERAMENT.NERVOUS:
          juego=juego.concat("Pero hay que agarrarme si vienen otros perros");
          break;
        case TEMPERAMENT.HOT_TEMPERED:
          juego=juego.concat("Pero no me tienen que sacar con correa y bozal");
          break;
        default:
          juego=juego.concat("Bastante normalcito")
      }
      return juego;
    }
  
    getAdoptionState()
    {
      return `El proceso de adopción de ${this.name} es..... ${this.adoptionState}`;
    }
    getName()
    {
      return this.adoptionState;
    }
    getBreed()
    {
      return this.breed;
    }
    getSize()
    {
      return this.size;
    }
    getRequirements()
    {
      return this.requirements;
    }
    getTemperament()
    {
      return this.temperament;
    }
  
    setTemperament(temperament) {
      switch(temperament) {
        case 1: 
          this.temperament=TEMPERAMENT.CALM;
          break;
        case 2: 
          this.temperament=TEMPERAMENT.FEARFUL;
          break;
        case 3: 
          this.temperament=TEMPERAMENT.PLAYFUL;
          break;
        case 4: 
          this.temperament=TEMPERAMENT.CHILDLIKE;
          break;
        case 5: 
          this.temperament=TEMPERAMENT.NERVOUS;
          break;
        case 6: 
          this.temperament=TEMPERAMENT.HOT_TEMPERED;
          break;
      }
      
    }
  
    setAdoptionState(application, approval)
    {
      if(application!=null && approval)
        this.adoptionState=ADOPTIONSTATE.ADOPTED;
      else if(application!=null)
        this.adoptionState=ADOPTIONSTATE.IN_PROCESS;
      else
        this.adoptionState=ADOPTIONSTATE.FOR_ADOPTION;
    }
  
  }

class Reports {

    constructor(animalitos){
        this.allDogs = animalitos.map(animalito => animalito.name);
        this.forAdoption = this.getDogsAdoptionState(animalitos, "En adopción responsable");
        this.inProcess = this.getDogsAdoptionState(animalitos, "Proceso de adopción en curso");
        this.adopted = this.getDogsAdoptionState(animalitos, "Adoptado!");
    }

    getDogsAdoptionState(dogs, adoptionState) {
        return (dogs.filter(dog => dog.adoptionState==adoptionState)).map(dog => dog.name);
    }
    
    produceReport() {
        console.log(".oOo.oOo.oOo.oOo.oOo.oOo.oOo.REPORTE.oOo.oOo.oOo.oOo.oOo.oOo.oOo.")
        console.log("Este es el total de animalitos en seguimiento por la perrera en este momento:\n");
        console.log(this.allDogs.join(", "));
        console.log("Este es el total de animalitos que están en adopción en este momento:\n");
        console.log(this.forAdoption.join(", "));
        console.log("Este es el total de animalitos que están en proceso de adopción en este momento:\n");
        console.log(this.inProcess.join(", "));
        console.log("Este es el total de animalitos que fueron adoptados en este momento:\n");
        console.log(this.adopted.join(", "));
    }
}

let animalitos=[];

do {
  let name=prompt("Ingrese nombre");
  let breed=prompt("Ingrese raza");
  let size=prompt("Ingrese peso en kilos");
  let inputTemperament=prompt("Describa el temperamento del animal en uno de los siguientes términos:\n1: Tranquilito \n3: Temeroso  \n4: Juguetón \n5: Cachorrón y medio loco,  \n6: Nervioso,  \n7: Irascible");
  let requirements=prompt("Ingrese necesidades especiales de este animal, separados por una coma y un espacio");

  let inputAnimal=new Dogs(name, breed, size, requirements);
  inputAnimal.setTemperament(parseInt(inputTemperament));

  console.log(inputAnimal);

  animalitos.push(inputAnimal);
}  while (
    confirm("¿Desea agregar otro animal?")
  )


let puccini=new Dogs("Puccini", "mestizo", "grande", "Jardín, paseo, ejercicio", ADOPTIONSTATE.ADOPTED);
puccini.setTemperament(4);
puccini.setAdoptionState("formulario", false);

let mora=new Dogs("Mora", "border collie", "mediano", "Jardín, entrenamiento, ejercicio", ADOPTIONSTATE.ADOPTED);
mora.setAdoptionState("formulario", true);

animalitos.push(puccini, mora)


let report = new Reports(animalitos);
report.produceReport();