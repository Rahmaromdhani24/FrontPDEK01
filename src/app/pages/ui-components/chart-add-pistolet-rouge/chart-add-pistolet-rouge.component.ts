import { Component } from '@angular/core';
import { 
  LineSeriesService,
  CategoryService,
  LegendService,
  TooltipService,
  StripLineService,
  DataLabelService,
  ChartAnnotationService
} from '@syncfusion/ej2-angular-charts';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart-add-pistolet-rouge',
  standalone: true,
  imports: [
    ChartModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [
    LineSeriesService,
    CategoryService,
    LegendService,
    TooltipService,
    StripLineService,
    DataLabelService,
    ChartAnnotationService
  ],
  templateUrl: './chart-add-pistolet-rouge.component.html',
  styleUrls: ['./chart-add-pistolet-rouge.component.scss']
})
export class ChartAddPistoletRougeComponent {
  /***************************** Chart moyenne X *******************************************/
    // Titre et style
    public title: string = 'La Moyenne X̄';
    public titleStyle: Object = {
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fontSize: '18px',
      color: '#333'
    };
  
    // Configuration de l'axe X
    public primaryXAxis: Object = {
      valueType: 'Category',
      majorGridLines: { width: 0 },
      labelIntersectAction: 'Rotate45',
      labelRotation: -45,
      labelStyle: { 
        color: '#333',
        fontFamily: 'Arial',
        fontSize: '12px'
      },
      edgeLabelPlacement: 'Shift'
    };
  
    // Configuration de l'axe Y
    public primaryYAxis: Object = {
      minimum: 110,
      maximum: 180,
      interval: 10,
      majorTickLines: { width: 0 },
      lineStyle: { width: 0 },
      majorGridLines: { width: 1, color: '#e0e0e0' },
      labelStyle: { 
        // color: '#333',
         //fontFamily: 'Arial',
        // fontSize: '12px'
         color: 'transparent'
       },
      stripLines: [
        // Zones colorées
        { start: 110, end: 126, color: 'rgba(255, 0, 0, 0.43)', zIndex: 'Behind' },
        { start: 125, end: 131, color: 'rgba(255, 255, 0, 0.64)', zIndex: 'Behind' },
        { start: 131, end: 149, color: 'rgba(0, 200, 0, 0.53)', zIndex: 'Behind' },
        { start: 149, end: 166, color: 'rgba(255, 255, 0, 0.64)', zIndex: 'Behind' },
        { start: 166, end: 180, color: 'rgba(255, 0, 0, 0.43)', zIndex: 'Behind' },
        
        // Lignes rouges
        { 
          start: 125, 
          end: 125.1, 
          color: 'red', 
          zIndex: 'Over', // Important: doit être au-dessus
          border: { color: 'red', width: 2 },
          opacity: 1
        },
        { 
          start: 166, 
          end: 166.1, 
          color: 'red', 
          zIndex: 'Over', // Important: doit être au-dessus
          border: { color: 'red', width: 2 },
          opacity: 1
        }
        ,
        { 
          start: 140, 
          end: 140.1, 
          color: 'black', 
          zIndex: 'Over', // Important: doit être au-dessus
          border: { color: 'black', width: 1 },
          opacity: 1
        } , 
        {
          start: 149,
          end: 149.1,  // Léger décalage pour s'assurer que la ligne est visible
          color: 'black',
          width: 1,
          dashArray: '5,3',  // 5px de tiret, 3px d'espace
          zIndex: 'Over'
        },
        {
          start: 131,
          end: 131.1,  // Léger décalage pour s'assurer que la ligne est visible
          color: 'black',
          width: 1,
          dashArray: '5,3',  // 5px de tiret, 3px d'espace
          zIndex: 'Over'
        },
      ]
    };
  
    // Données de la série
    public seriesMoyenne: Object[] = [
      { x: '2025-23-10', y: 140 }, { x: '2025-23-11', y: 134 }, { x: '2025-23-12', y: 145 },
      { x: '2025-23-13', y: 136 }, { x: '2025-23-14', y: 140 }, { x: '2025-23-15', y: 144 },
      { x: '2025-23-16', y: 143 }, 

    ];
  
    // Configuration du tooltip
    public tooltip: Object = {
      enable: true,
      format: '${point.x} : <b>${point.y}</b>',
      fill: '#333',
      textStyle: { color: 'white' }
    };
  
    // Configuration des annotations
    public annotations: Object[] = [
      {
        content: '<div style="color: #333; font-weight: bold;">Zone Critique</div>',
        x: '90%',
        y: 125,
        coordinateUnits: 'Point',
        region: 'Chart'
      } , 
      {
        content: '<div style="border-top: 1px dashed black; width: 100%;"></div>',
        x: '0%',
        y: '149',
        coordinateUnits: 'Point',
        region: 'Chart'
      }
      , 
      {
        content: '<div style="border-top: 1px dashed black; width: 100%;"></div>',
        x: '0%',
        y: '131',
        coordinateUnits: 'Point',
        region: 'Chart'
      }
    ];
  
    // Style du marqueur
    public marker: Object = {
      visible: true,
      width: 7,
      height: 7,
      fill: '#007bff',
      border: { width: 2, color: 'white' }
    };
  
    // Style de la ligne
    public chartArea: Object = {
      border: { width: 0 }
    };
  
 /*********************** Chart d'Étendue R *******************************/
 public titleEtendue: string = 'L\'étendue R';
 public titleStyleEtendue: Object = {
   fontFamily: 'Arial',
   fontWeight: 'bold',
   size: '18px'
 };

 public primaryXAxisEtendue: Object = {
  minimum: 0,
  maximum: 26, // Ajusté à 26 pour inclure le nouveau point
  interval: 1,
  majorGridLines: { width: 1 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 1 },
  valueType: 'Double'
};
 public primaryYAxisEtendue: Object = {
   minimum: 0,
   maximum: 14, // Changé de 6 à 10 comme demandé
   interval: 1,
   stripLines: [{
     start: 12,
     end: 12.1,
     color: 'red',
     zIndex: 'Over',
     border: { color: 'red', width: 2 },
     opacity: 1
   }],
 };
 public annotationsEtendue: Object[] = [{
  content: '<div style="border-top: 2px solid red; width:100%"></div>',
  x: '0%',
  y: 12,
  coordinateUnits: 'Point',
  region: 'Chart'
}];
public seriesEtendue: Object[] = [
  { x: '1', y: 2.5 }, { x: '2', y: 3.1 }, { x: '3', y: 4.2 },
  { x: '4', y: 3.8 }, { x: '5', y: 5.0 }, { x: '6', y: 6.2 },
  { x: '7', y: 7.4 }, { x: '8', y: 8.1 }, { x: '9', y: 7.3 },
  { x: '10', y: 6.5 }, { x: '11', y: 5.7 }, { x: '12', y: 4.9 },
  { x: '13', y: 4.1 }, { x: '14', y: 3.3 }, { x: '15', y: 2.5 },
  { x: '16', y: 3.7 }, { x: '17', y: 4.9 }, { x: '18', y: 6.1 },
  { x: '19', y: 7.3 }, { x: '20', y: 8.5 }, { x: '21', y: 9.2 },
  { x: '22', y: 8.4 }, { x: '23', y: 7.6 }, { x: '24', y: 6.8 },
  { x: '25', y: 6.0 }
];
 public tooltipEtendue: Object = {
   enable: true,
   format: 'X: ${point.x} <br/> Y: ${point.y}'
 };

 public markerEtendue: Object = {
  visible: true,
  width: 8,
  height: 8,
  fill: '#333',       // Couleur de remplissage
  border: { 
    width: 1, 
    color: '#fff'    // Bordure blanche
  }
};
 
}