import { Component  , OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { Pistolet } from 'src/app/Modeles/Pistolet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Assure-toi que CommonModule est importé
import Swal from 'sweetalert2';
import { PistoletPneumatiqueService } from 'src/app/services/Agent Qualité/Ajout PDEK Pistolet/pistolet-pneumatique.service';

interface CoupePropre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-pistolet-pneumatique',
imports: [ MatFormFieldModule,
      MatSelectModule,
      FormsModule,
      ReactiveFormsModule,
      MatRadioModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      MatCheckboxModule,
      CommonModule],
  templateUrl: './add-pistolet-pneumatique.component.html',
  styleUrl: './add-pistolet-pneumatique.component.scss'
})
export class AddPistoletPneumatiqueComponent implements OnInit{
  
  country: CoupePropre[] = [
    { value: 'Ok', viewValue: 'OK' },
    { value: 'N-OK', viewValue: 'N-Ok' },
  ];

  types: CoupePropre[] = [
    { value: 'PISTOLET_VERT', viewValue: 'Pistolet Vert' },
    { value: 'PISTOLET_ROUGE', viewValue: 'Pistolet Rouge' },
    { value: 'PISTOLET_JAUNE', viewValue: 'Pistolet Jaune' },
    { value: 'PISTOLET_BLEU', viewValue: 'Pistolet Bleu' },
  ];
  selectedValue: any; 
  myForm: FormGroup;

  constructor(private pistoletPneumatiqueService: PistoletPneumatiqueService) {}
  pistolet: Pistolet = new Pistolet();
  ngOnInit(): void {
    this.myForm = new FormGroup({
      selectedValue: new FormControl(null, Validators.required),
      nombreCollier: new FormControl('', Validators.required),
      axeSerrage: new FormControl('', Validators.required),
      semaine: new FormControl('', Validators.required),
      echantillon1: new FormControl('', Validators.required),
      echantillon2: new FormControl('', Validators.required),
      echantillon3: new FormControl('', Validators.required),
      echantillon4: new FormControl('', Validators.required),
      echantillon5: new FormControl('', Validators.required),
      numeroPistolet: new FormControl('', Validators.required),
      typePistolet: new FormControl('', Validators.required),
    });
  
  }
  submitForm() {
    if (this.myForm.valid) {
      /*******************     Pistolet Bleu    *******************************************/
      if (this.myForm.get('typePistolet')?.value === "PISTOLET_BLEU") {
      // Créer un nouvel objet Pistolet avec les valeurs du FormGroup
      const pistolet: Pistolet = new Pistolet();
  
      // Assigner les valeurs du formulaire à l'objet Pistolet
      pistolet.coupePropre = this.myForm.get('selectedValue')?.value;
      pistolet.nbrCollierTester = this.myForm.get('nombreCollier')?.value;
      pistolet.axeSerrage = this.myForm.get('axeSerrage')?.value;
      pistolet.semaine = this.myForm.get('semaine')?.value;
   // Convertir les valeurs en nombre et filtrer les valeurs non définies
const echantillons = [
  Number(this.myForm.get('echantillon1')?.value),
  Number(this.myForm.get('echantillon2')?.value),
  Number(this.myForm.get('echantillon3')?.value),
  Number(this.myForm.get('echantillon4')?.value),
  Number(this.myForm.get('echantillon5')?.value)
].filter(val => !isNaN(val)); // Filtrer les valeurs NaN

// Vérifier qu'il y a au moins une valeur valide avant de faire les calculs
if (echantillons.length > 0) {
  const valeurMax = Math.max(...echantillons);
  const valeurMin = Math.min(...echantillons);

  // Calculer la moyenne correctement
  const somme = echantillons.reduce((acc, val) => acc + val, 0);
  const moyenne = somme / echantillons.length;

  // Affecter les valeurs à l'objet pistolet
  pistolet.ech1 = echantillons[0] || 0;
  pistolet.ech2 = echantillons[1] || 0;
  pistolet.ech3 = echantillons[2] || 0;
  pistolet.ech4 = echantillons[3] || 0;
  pistolet.ech5 = echantillons[4] || 0;
  pistolet.moyenne = moyenne;
  pistolet.etendu = valeurMax - valeurMin;
}
      pistolet.type="PISTOLET_BLEU"
      pistolet.categorie="Pneumatique"
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      pistolet.dateCreation=formattedDate ; 
      pistolet.limiteInterventionMin = "50 N" 
      pistolet.limiteInterventionMax = "80 N"
      pistolet.specificationMesure = "65 N"
      pistolet.numeroPistolet = this.myForm.get('numeroPistolet')?.value;
      const matriculeUser: number = Number(localStorage.getItem('matricule'));
  
      // Appeler le service pour ajouter le pistolet
      this.pistoletPneumatiqueService.ajouterPistolet(matriculeUser, pistolet).subscribe(
        (response: Pistolet) => {
       // Réinitialiser le formulaire entier
    this.myForm.reset();
  
    // Optionnel : Vous pouvez aussi définir les valeurs par défaut pour chaque champ ici si nécessaire
    this.myForm.patchValue({
      echantillon1: '',
      echantillon2: '',
      echantillon3: '',
      echantillon4: '',
      echantillon5: '',
      nombreCollier: '',
      axeSerrage: '',
      semaine: '',
      numeroPistolet: '',
      typePistolet: '',
      coupePropre: '',
      selectedValue : ''
    });
  
    // Mettre à jour la validité du formulaire après réinitialisation
    this.myForm.updateValueAndValidity();
  
    // Réinitialiser les erreurs de validation pour chaque champ
    this.myForm.get('echantillon1')?.setErrors(null);
    this.myForm.get('echantillon2')?.setErrors(null);
    this.myForm.get('echantillon3')?.setErrors(null);
    this.myForm.get('echantillon4')?.setErrors(null);
    this.myForm.get('echantillon5')?.setErrors(null);
    this.myForm.get('nombreCollier')?.setErrors(null);
    this.myForm.get('axeSerrage')?.setErrors(null);
    this.myForm.get('semaine')?.setErrors(null);
    this.myForm.get('numeroPistolet')?.setErrors(null);
    this.myForm.get('typePistolet')?.setErrors(null);
    this.myForm.get('selectedValue')?.setErrors(null);
  
    // Vérifier que les champs sont désormais en état "normal" sans erreurs
    if (this.myForm.valid) {
      console.log('Le formulaire est valide après réinitialisation');
    } else {
      console.log('Le formulaire est invalide après réinitialisation');
    }
  
    // Affichage de l'alerte de succès
    Swal.fire({
      title: 'Ajout réussi !',
      text: 'Le pistolet a été ajouté avec succès.',
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-popup',
        title: 'custom-title',
        confirmButton: 'custom-confirm-button'
      }
    });
          
          console.log('Pistolet ajouté avec succès', response);
        },
        (error: any) => {
          console.error('Erreur lors de l’ajout du pistolet', error);
        }
      );
  
      // Afficher les variables max et min et l'objet Pistolet pour débogage
    
      console.log('Objet Pistolet envoyé:', pistolet);
    }
  
  else if (this.myForm.get('typePistolet')?.value === "PISTOLET_ROUGE") {
    // Créer un nouvel objet Pistolet avec les valeurs du FormGroup
    const pistolet: Pistolet = new Pistolet();

    // Assigner les valeurs du formulaire à l'objet Pistolet
    pistolet.coupePropre = this.myForm.get('selectedValue')?.value;
    pistolet.nbrCollierTester = this.myForm.get('nombreCollier')?.value;
    pistolet.axeSerrage = this.myForm.get('axeSerrage')?.value;
    pistolet.semaine = this.myForm.get('semaine')?.value;
 // Convertir les valeurs en nombre et filtrer les valeurs non définies
const echantillons = [
Number(this.myForm.get('echantillon1')?.value),
Number(this.myForm.get('echantillon2')?.value),
Number(this.myForm.get('echantillon3')?.value),
Number(this.myForm.get('echantillon4')?.value),
Number(this.myForm.get('echantillon5')?.value)
].filter(val => !isNaN(val)); // Filtrer les valeurs NaN

// Vérifier qu'il y a au moins une valeur valide avant de faire les calculs
if (echantillons.length > 0) {
const valeurMax = Math.max(...echantillons);
const valeurMin = Math.min(...echantillons);

// Calculer la moyenne correctement
const somme = echantillons.reduce((acc, val) => acc + val, 0);
const moyenne = somme / echantillons.length;

// Affecter les valeurs à l'objet pistolet
pistolet.ech1 = echantillons[0] || 0;
pistolet.ech2 = echantillons[1] || 0;
pistolet.ech3 = echantillons[2] || 0;
pistolet.ech4 = echantillons[3] || 0;
pistolet.ech5 = echantillons[4] || 0;
pistolet.moyenne = moyenne;
pistolet.etendu = valeurMax - valeurMin;
}
    pistolet.type="PISTOLET_ROUGE"
    pistolet.categorie="Pneumatique"
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    pistolet.dateCreation=formattedDate ; 
    pistolet.limiteInterventionMin = "120 N" 
    pistolet.limiteInterventionMax = "160 N"
    pistolet.specificationMesure ="140 N"
    pistolet.numeroPistolet = this.myForm.get('numeroPistolet')?.value;
    const matriculeUser: number = Number(localStorage.getItem('matricule'));

    // Appeler le service pour ajouter le pistolet
    this.pistoletPneumatiqueService.ajouterPistolet(matriculeUser, pistolet).subscribe(
       (response: Pistolet) => {
      // Réinitialiser le formulaire entier
   this.myForm.reset();
 
   // Optionnel : Vous pouvez aussi définir les valeurs par défaut pour chaque champ ici si nécessaire
   this.myForm.patchValue({
     echantillon1: '',
     echantillon2: '',
     echantillon3: '',
     echantillon4: '',
     echantillon5: '',
     nombreCollier: '',
     axeSerrage: '',
     semaine: '',
     numeroPistolet: '',
     typePistolet: '',
     coupePropre: '',
     selectedValue : ''
   });
 
   // Mettre à jour la validité du formulaire après réinitialisation
   this.myForm.updateValueAndValidity();
 
   // Réinitialiser les erreurs de validation pour chaque champ
   this.myForm.get('echantillon1')?.setErrors(null);
   this.myForm.get('echantillon2')?.setErrors(null);
   this.myForm.get('echantillon3')?.setErrors(null);
   this.myForm.get('echantillon4')?.setErrors(null);
   this.myForm.get('echantillon5')?.setErrors(null);
   this.myForm.get('nombreCollier')?.setErrors(null);
   this.myForm.get('axeSerrage')?.setErrors(null);
   this.myForm.get('semaine')?.setErrors(null);
   this.myForm.get('numeroPistolet')?.setErrors(null);
   this.myForm.get('typePistolet')?.setErrors(null);
   this.myForm.get('selectedValue')?.setErrors(null);
 
   // Vérifier que les champs sont désormais en état "normal" sans erreurs
   if (this.myForm.valid) {
     console.log('Le formulaire est valide après réinitialisation');
   } else {
     console.log('Le formulaire est invalide après réinitialisation');
   }
 
   // Affichage de l'alerte de succès
   Swal.fire({
     title: 'Ajout réussi !',
     text: 'Le pistolet a été ajouté avec succès.',
     icon: 'success',
     confirmButtonText: 'OK',
     customClass: {
       popup: 'custom-popup',
       title: 'custom-title',
       confirmButton: 'custom-confirm-button'
     }
   });
         
         console.log('Pistolet ajouté avec succès', response);
       },
      (error: any) => {
        console.error('Erreur lors de l’ajout du pistolet', error);
      }
    );

    // Afficher les variables max et min et l'objet Pistolet pour débogage
  
    console.log('Objet Pistolet envoyé:', pistolet);
  }
  /************************* Pistolet vert  ************************/
  else if (this.myForm.get('typePistolet')?.value === "PISTOLET_VERT") {
    // Créer un nouvel objet Pistolet avec les valeurs du FormGroup
    const pistolet: Pistolet = new Pistolet();

    // Assigner les valeurs du formulaire à l'objet Pistolet
    pistolet.coupePropre = this.myForm.get('selectedValue')?.value;
    pistolet.nbrCollierTester = this.myForm.get('nombreCollier')?.value;
    pistolet.axeSerrage = this.myForm.get('axeSerrage')?.value;
    pistolet.semaine = this.myForm.get('semaine')?.value;
 // Convertir les valeurs en nombre et filtrer les valeurs non définies
const echantillons = [
Number(this.myForm.get('echantillon1')?.value),
Number(this.myForm.get('echantillon2')?.value),
Number(this.myForm.get('echantillon3')?.value),
Number(this.myForm.get('echantillon4')?.value),
Number(this.myForm.get('echantillon5')?.value)
].filter(val => !isNaN(val)); // Filtrer les valeurs NaN

// Vérifier qu'il y a au moins une valeur valide avant de faire les calculs
if (echantillons.length > 0) {
const valeurMax = Math.max(...echantillons);
const valeurMin = Math.min(...echantillons);

// Calculer la moyenne correctement
const somme = echantillons.reduce((acc, val) => acc + val, 0);
const moyenne = somme / echantillons.length;

// Affecter les valeurs à l'objet pistolet
pistolet.ech1 = echantillons[0] || 0;
pistolet.ech2 = echantillons[1] || 0;
pistolet.ech3 = echantillons[2] || 0;
pistolet.ech4 = echantillons[3] || 0;
pistolet.ech5 = echantillons[4] || 0;
pistolet.moyenne = moyenne;
pistolet.etendu = valeurMax - valeurMin;
}
    pistolet.type="PISTOLET_VERT"
    pistolet.categorie="Pneumatique"
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    pistolet.dateCreation=formattedDate ; 
    pistolet.limiteInterventionMin = "80 N" 
    pistolet.limiteInterventionMax = "120 N"
    pistolet.specificationMesure = "100 N" ; 
    pistolet.numeroPistolet = this.myForm.get('numeroPistolet')?.value;
    const matriculeUser: number = Number(localStorage.getItem('matricule'));

    // Appeler le service pour ajouter le pistolet
    this.pistoletPneumatiqueService.ajouterPistolet(matriculeUser, pistolet).subscribe(
      (response: Pistolet) => {
     // Réinitialiser le formulaire entier
  this.myForm.reset();

  // Optionnel : Vous pouvez aussi définir les valeurs par défaut pour chaque champ ici si nécessaire
  this.myForm.patchValue({
    echantillon1: '',
    echantillon2: '',
    echantillon3: '',
    echantillon4: '',
    echantillon5: '',
    nombreCollier: '',
    axeSerrage: '',
    semaine: '',
    numeroPistolet: '',
    typePistolet: '',
    coupePropre: '',
    selectedValue : ''
  });

  // Mettre à jour la validité du formulaire après réinitialisation
  this.myForm.updateValueAndValidity();

  // Réinitialiser les erreurs de validation pour chaque champ
  this.myForm.get('echantillon1')?.setErrors(null);
  this.myForm.get('echantillon2')?.setErrors(null);
  this.myForm.get('echantillon3')?.setErrors(null);
  this.myForm.get('echantillon4')?.setErrors(null);
  this.myForm.get('echantillon5')?.setErrors(null);
  this.myForm.get('nombreCollier')?.setErrors(null);
  this.myForm.get('axeSerrage')?.setErrors(null);
  this.myForm.get('semaine')?.setErrors(null);
  this.myForm.get('numeroPistolet')?.setErrors(null);
  this.myForm.get('typePistolet')?.setErrors(null);
  this.myForm.get('selectedValue')?.setErrors(null);

  // Vérifier que les champs sont désormais en état "normal" sans erreurs
  if (this.myForm.valid) {
    console.log('Le formulaire est valide après réinitialisation');
  } else {
    console.log('Le formulaire est invalide après réinitialisation');
  }

  // Affichage de l'alerte de succès
  Swal.fire({
    title: 'Ajout réussi !',
    text: 'Le pistolet a été ajouté avec succès.',
    icon: 'success',
    confirmButtonText: 'OK',
    customClass: {
      popup: 'custom-popup',
      title: 'custom-title',
      confirmButton: 'custom-confirm-button'
    }
  });
        
        console.log('Pistolet ajouté avec succès', response);
      },
      (error: any) => {
        console.error('Erreur lors de l’ajout du pistolet', error);
      }
    );

    // Afficher les variables max et min et l'objet Pistolet pour débogage
  
    console.log('Objet Pistolet envoyé:', pistolet);
  }
  /****************************Pistolet Rouge ********************************/
  else if (this.myForm.get('typePistolet')?.value === "PISTOLET_JAUNE") {
    // Créer un nouvel objet Pistolet avec les valeurs du FormGroup
    const pistolet: Pistolet = new Pistolet();

    // Assigner les valeurs du formulaire à l'objet Pistolet
    pistolet.coupePropre = this.myForm.get('selectedValue')?.value;
    pistolet.nbrCollierTester = this.myForm.get('nombreCollier')?.value;
    pistolet.axeSerrage = this.myForm.get('axeSerrage')?.value;
    pistolet.semaine = this.myForm.get('semaine')?.value;
 // Convertir les valeurs en nombre et filtrer les valeurs non définies
const echantillons = [
Number(this.myForm.get('echantillon1')?.value),
Number(this.myForm.get('echantillon2')?.value),
Number(this.myForm.get('echantillon3')?.value),
Number(this.myForm.get('echantillon4')?.value),
Number(this.myForm.get('echantillon5')?.value)
].filter(val => !isNaN(val)); // Filtrer les valeurs NaN

// Vérifier qu'il y a au moins une valeur valide avant de faire les calculs
if (echantillons.length > 0) {
const valeurMax = Math.max(...echantillons);
const valeurMin = Math.min(...echantillons);

// Calculer la moyenne correctement
const somme = echantillons.reduce((acc, val) => acc + val, 0);
const moyenne = somme / echantillons.length;

// Affecter les valeurs à l'objet pistolet
pistolet.ech1 = echantillons[0] || 0;
pistolet.ech2 = echantillons[1] || 0;
pistolet.ech3 = echantillons[2] || 0;
pistolet.ech4 = echantillons[3] || 0;
pistolet.ech5 = echantillons[4] || 0;
pistolet.moyenne = moyenne;
pistolet.etendu = valeurMax - valeurMin;
}
    pistolet.type="PISTOLET_JAUNE"
    pistolet.categorie="Pneumatique"
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    pistolet.dateCreation=formattedDate ; 
    pistolet.limiteInterventionMin = "34 N" 
    pistolet.limiteInterventionMax = "46 N"
    pistolet.numeroPistolet = this.myForm.get('numeroPistolet')?.value;
    pistolet.specificationMesure = "40 N" ; 
    const matriculeUser: number = Number(localStorage.getItem('matricule'));

    // Appeler le service pour ajouter le pistolet
    this.pistoletPneumatiqueService.ajouterPistolet(matriculeUser, pistolet).subscribe(
      (response: Pistolet) => {
     // Réinitialiser le formulaire entier
  this.myForm.reset();

  // Optionnel : Vous pouvez aussi définir les valeurs par défaut pour chaque champ ici si nécessaire
  this.myForm.patchValue({
    echantillon1: '',
    echantillon2: '',
    echantillon3: '',
    echantillon4: '',
    echantillon5: '',
    nombreCollier: '',
    axeSerrage: '',
    semaine: '',
    numeroPistolet: '',
    typePistolet: '',
    coupePropre: '',
    selectedValue : ''
  });

  // Mettre à jour la validité du formulaire après réinitialisation
  this.myForm.updateValueAndValidity();

  // Réinitialiser les erreurs de validation pour chaque champ
  this.myForm.get('echantillon1')?.setErrors(null);
  this.myForm.get('echantillon2')?.setErrors(null);
  this.myForm.get('echantillon3')?.setErrors(null);
  this.myForm.get('echantillon4')?.setErrors(null);
  this.myForm.get('echantillon5')?.setErrors(null);
  this.myForm.get('nombreCollier')?.setErrors(null);
  this.myForm.get('axeSerrage')?.setErrors(null);
  this.myForm.get('semaine')?.setErrors(null);
  this.myForm.get('numeroPistolet')?.setErrors(null);
  this.myForm.get('typePistolet')?.setErrors(null);
  this.myForm.get('selectedValue')?.setErrors(null);

  // Vérifier que les champs sont désormais en état "normal" sans erreurs
  if (this.myForm.valid) {
    console.log('Le formulaire est valide après réinitialisation');
  } else {
    console.log('Le formulaire est invalide après réinitialisation');
  }

  // Affichage de l'alerte de succès
  Swal.fire({
    title: 'Ajout réussi !',
    text: 'Le pistolet a été ajouté avec succès.',
    icon: 'success',
    confirmButtonText: 'OK',
    customClass: {
      popup: 'custom-popup',
      title: 'custom-title',
      confirmButton: 'custom-confirm-button'
    }
  });
        
        console.log('Pistolet ajouté avec succès', response);
      },
      (error: any) => {
        console.error('Erreur lors de l’ajout du pistolet', error);
      }
    );

    // Afficher les variables max et min et l'objet Pistolet pour débogage
  
    console.log('Objet Pistolet envoyé:', pistolet);
  }
}
}
  
  
  
    // Méthode pour réinitialiser le formulaire
    cancelForm() {
      this.myForm.reset();
    }
}

