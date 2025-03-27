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
import { Router } from '@angular/router';

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

  constructor(private pistoletPneumatiqueService: PistoletPneumatiqueService  , private router : Router) {}
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
      if (this.myForm.invalid) {
        Swal.fire({
          title: 'Champs manquants',
          text: 'Veuillez remplir tous les champs obligatoires.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }
      if (this.myForm.valid) {
        /*******************     Pistolet Bleu    *******************************************/
        if (this.myForm.get('typePistolet')?.value === "PISTOLET_BLEU") {
  
          // Créer un nouvel objet Pistolet avec les valeurs du FormGroup
          const pistolet: Pistolet = new Pistolet();
        
          // Liste des champs obligatoires à vérifier
          const requiredFields = [
            'echantillon1', 'echantillon2', 'echantillon3', 'echantillon4', 'echantillon5', 
            'nombreCollier', 'axeSerrage', 'semaine', 'numeroPistolet', 'selectedValue'
          ];
        
          let allFieldsFilled = true;
        
          // Vérifier si chaque champ obligatoire est rempli
          requiredFields.forEach(field => {
            const control = this.myForm.get(field);
            if (!control?.value) {
              // Appliquer une bordure rouge si le champ est vide
              control?.markAsTouched(); // Marquer comme touché pour activer les erreurs de validation
              control?.setErrors({ required: true });
              const inputElement = document.getElementById(field);
              if (inputElement) {
                inputElement.style.borderColor = 'red'; // Appliquer la couleur rouge au bord
              }
              allFieldsFilled = false;
            } else {
              const inputElement = document.getElementById(field);
              if (inputElement) {
                inputElement.style.borderColor = ''; // Réinitialiser la couleur du bord si le champ est rempli
              }
            }
          });
        
          // Convertir les valeurs en nombre et filtrer les valeurs non définies
          const echantillons = [
            Number(this.myForm.get('echantillon1')?.value),
            Number(this.myForm.get('echantillon2')?.value),
            Number(this.myForm.get('echantillon3')?.value),
            Number(this.myForm.get('echantillon4')?.value),
            Number(this.myForm.get('echantillon5')?.value)
          ].filter(val => !isNaN(val)); // Filtrer les valeurs NaN
        
          // Vérification si tous les échantillons sont identiques
          const allIdentical = echantillons.every(val => val === echantillons[0]);
        
          if (allIdentical) {
            // Afficher une alerte d'erreur si tous les échantillons sont identiques
            Swal.fire({
              title: 'Erreur',
              text: 'Tous les échantillons ne peuvent pas être identiques.',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                popup: 'custom-popup',
                title: 'custom-title',
                confirmButton: 'custom-confirm-button'
              }
            });
            return; // Empêche l'appel à la méthode ajouterPistolet si les valeurs sont identiques
          }
        
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
        
          pistolet.type = "PISTOLET_BLEU";
          pistolet.categorie = "Pneumatique";
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split('T')[0];
          pistolet.dateCreation = formattedDate;
          pistolet.limiteInterventionMin = "50 N";
          pistolet.limiteInterventionMax = "80 N";
          pistolet.numeroPistolet = this.myForm.get('numeroPistolet')?.value;
          pistolet.specificationMesure = "65 N";
          pistolet.axeSerrage = this.myForm.get('axeSerrage')?.value ;
          pistolet.coupePropre =this.myForm.get('selectedValue')?.value;
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
                this.router.navigate(['/ui-components/chartAddPistoletBleu'])
      
              console.log('Pistolet ajouté avec succès', response);
            },
            (error: any) => {
              console.error('Erreur lors de l’ajout du pistolet', error);
            }
          );
        
          // Afficher les variables max et min et l'objet Pistolet pour débogage
          console.log('Objet Pistolet envoyé:', pistolet);
        }
    /*********************************** Rouge ***********************************/
    else if (this.myForm.get('typePistolet')?.value === "PISTOLET_ROUGE") {
  
      // Créer un nouvel objet Pistolet avec les valeurs du FormGroup
      const pistolet: Pistolet = new Pistolet();
    
      // Liste des champs obligatoires à vérifier
      const requiredFields = [
        'echantillon1', 'echantillon2', 'echantillon3', 'echantillon4', 'echantillon5', 
        'nombreCollier', 'axeSerrage', 'semaine', 'numeroPistolet', 'selectedValue'
      ];
    
      let allFieldsFilled = true;
    
      // Vérifier si chaque champ obligatoire est rempli
      requiredFields.forEach(field => {
        const control = this.myForm.get(field);
        if (!control?.value) {
          // Appliquer une bordure rouge si le champ est vide
          control?.markAsTouched(); // Marquer comme touché pour activer les erreurs de validation
          control?.setErrors({ required: true });
          const inputElement = document.getElementById(field);
          if (inputElement) {
            inputElement.style.borderColor = 'red'; // Appliquer la couleur rouge au bord
          }
          allFieldsFilled = false;
        } else {
          const inputElement = document.getElementById(field);
          if (inputElement) {
            inputElement.style.borderColor = ''; // Réinitialiser la couleur du bord si le champ est rempli
          }
        }
      });
    
      // Convertir les valeurs en nombre et filtrer les valeurs non définies
      const echantillons = [
        Number(this.myForm.get('echantillon1')?.value),
        Number(this.myForm.get('echantillon2')?.value),
        Number(this.myForm.get('echantillon3')?.value),
        Number(this.myForm.get('echantillon4')?.value),
        Number(this.myForm.get('echantillon5')?.value)
      ].filter(val => !isNaN(val)); // Filtrer les valeurs NaN
    
      // Vérification si tous les échantillons sont identiques
      const allIdentical = echantillons.every(val => val === echantillons[0]);
    
      if (allIdentical) {
        // Afficher une alerte d'erreur si tous les échantillons sont identiques
        Swal.fire({
          title: 'Erreur',
          text: 'Tous les échantillons ne peuvent pas être identiques.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-popup',
            title: 'custom-title',
            confirmButton: 'custom-confirm-button'
          }
        });
        return; // Empêche l'appel à la méthode ajouterPistolet si les valeurs sont identiques
      }
    
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
    
      pistolet.type = "PISTOLET_ROUGE";
      pistolet.categorie = "Pneumatique";
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      pistolet.dateCreation = formattedDate;
      pistolet.limiteInterventionMin = "120 N";
      pistolet.limiteInterventionMax = "160 N";
      pistolet.numeroPistolet = this.myForm.get('numeroPistolet')?.value;
      pistolet.specificationMesure = "140 N";
      pistolet.axeSerrage = this.myForm.get('axeSerrage')?.value ;
      pistolet.coupePropre =this.myForm.get('selectedValue')?.value;
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
            this.router.navigate(['/ui-components/chartAddPistoletRouge'])
  
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
    
      // Liste des champs obligatoires à vérifier
      const requiredFields = [
        'echantillon1', 'echantillon2', 'echantillon3', 'echantillon4', 'echantillon5', 
        'nombreCollier', 'axeSerrage', 'semaine', 'numeroPistolet', 'selectedValue'
      ];
    
      let allFieldsFilled = true;
    
      // Vérifier si chaque champ obligatoire est rempli
      requiredFields.forEach(field => {
        const control = this.myForm.get(field);
        if (!control?.value) {
          // Appliquer une bordure rouge si le champ est vide
          control?.markAsTouched(); // Marquer comme touché pour activer les erreurs de validation
          control?.setErrors({ required: true });
          const inputElement = document.getElementById(field);
          if (inputElement) {
            inputElement.style.borderColor = 'red'; // Appliquer la couleur rouge au bord
          }
          allFieldsFilled = false;
        } else {
          const inputElement = document.getElementById(field);
          if (inputElement) {
            inputElement.style.borderColor = ''; // Réinitialiser la couleur du bord si le champ est rempli
          }
        }
      });
    
      // Convertir les valeurs en nombre et filtrer les valeurs non définies
      const echantillons = [
        Number(this.myForm.get('echantillon1')?.value),
        Number(this.myForm.get('echantillon2')?.value),
        Number(this.myForm.get('echantillon3')?.value),
        Number(this.myForm.get('echantillon4')?.value),
        Number(this.myForm.get('echantillon5')?.value)
      ].filter(val => !isNaN(val)); // Filtrer les valeurs NaN
    
      // Vérification si tous les échantillons sont identiques
      const allIdentical = echantillons.every(val => val === echantillons[0]);
    
      if (allIdentical) {
        // Afficher une alerte d'erreur si tous les échantillons sont identiques
        Swal.fire({
          title: 'Erreur',
          text: 'Tous les échantillons ne peuvent pas être identiques.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-popup',
            title: 'custom-title',
            confirmButton: 'custom-confirm-button'
          }
        });
        return; // Empêche l'appel à la méthode ajouterPistolet si les valeurs sont identiques
      }
    
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
    
      pistolet.type = "PISTOLET_VERT";
      pistolet.categorie = "Pneumatique";
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      pistolet.dateCreation = formattedDate;
      pistolet.limiteInterventionMin = "80 N";
      pistolet.limiteInterventionMax = "120 N";
      pistolet.numeroPistolet = this.myForm.get('numeroPistolet')?.value;
      pistolet.specificationMesure = "100 N";
      pistolet.axeSerrage = this.myForm.get('axeSerrage')?.value ;
      pistolet.coupePropre =this.myForm.get('selectedValue')?.value;
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
            this.router.navigate(['/ui-components/chartAddPistoletVert'])
  
          console.log('Pistolet ajouté avec succès', response);
        },
        (error: any) => {
          console.error('Erreur lors de l’ajout du pistolet', error);
        }
      );
    
      // Afficher les variables max et min et l'objet Pistolet pour débogage
      console.log('Objet Pistolet envoyé:', pistolet);
    }
    /****************************Pistolet Jaune ********************************/
    else if (this.myForm.get('typePistolet')?.value === "PISTOLET_JAUNE") {
  
      // Créer un nouvel objet Pistolet avec les valeurs du FormGroup
      const pistolet: Pistolet = new Pistolet();
    
      // Liste des champs obligatoires à vérifier
      const requiredFields = [
        'echantillon1', 'echantillon2', 'echantillon3', 'echantillon4', 'echantillon5', 
        'nombreCollier', 'axeSerrage', 'semaine', 'numeroPistolet', 'selectedValue'
      ];
    
      let allFieldsFilled = true;
    
      // Vérifier si chaque champ obligatoire est rempli
      requiredFields.forEach(field => {
        const control = this.myForm.get(field);
        if (!control?.value) {
          // Appliquer une bordure rouge si le champ est vide
          control?.markAsTouched(); // Marquer comme touché pour activer les erreurs de validation
          control?.setErrors({ required: true });
          const inputElement = document.getElementById(field);
          if (inputElement) {
            inputElement.style.borderColor = 'red'; // Appliquer la couleur rouge au bord
          }
          allFieldsFilled = false;
        } else {
          const inputElement = document.getElementById(field);
          if (inputElement) {
            inputElement.style.borderColor = ''; // Réinitialiser la couleur du bord si le champ est rempli
          }
        }
      });
    
      // Convertir les valeurs en nombre et filtrer les valeurs non définies
      const echantillons = [
        Number(this.myForm.get('echantillon1')?.value),
        Number(this.myForm.get('echantillon2')?.value),
        Number(this.myForm.get('echantillon3')?.value),
        Number(this.myForm.get('echantillon4')?.value),
        Number(this.myForm.get('echantillon5')?.value)
      ].filter(val => !isNaN(val)); // Filtrer les valeurs NaN
    
      // Vérification si tous les échantillons sont identiques
      const allIdentical = echantillons.every(val => val === echantillons[0]);
    
      if (allIdentical) {
        // Afficher une alerte d'erreur si tous les échantillons sont identiques
        Swal.fire({
          title: 'Erreur',
          text: 'Tous les échantillons ne peuvent pas être identiques.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-popup',
            title: 'custom-title',
            confirmButton: 'custom-confirm-button'
          }
        });
        return; // Empêche l'appel à la méthode ajouterPistolet si les valeurs sont identiques
      }
    
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
    
      pistolet.type = "PISTOLET_JAUNE";
      pistolet.categorie = "Pneumatique";
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      pistolet.dateCreation = formattedDate;
      pistolet.limiteInterventionMin = "34 N";
      pistolet.limiteInterventionMax = "46 N";
      pistolet.numeroPistolet = this.myForm.get('numeroPistolet')?.value;
      pistolet.specificationMesure = "40 N";
      pistolet.axeSerrage = this.myForm.get('axeSerrage')?.value ;
      pistolet.coupePropre =this.myForm.get('selectedValue')?.value;
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
            this.router.navigate(['/ui-components/chartAddPistoletJaune'])
  
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

