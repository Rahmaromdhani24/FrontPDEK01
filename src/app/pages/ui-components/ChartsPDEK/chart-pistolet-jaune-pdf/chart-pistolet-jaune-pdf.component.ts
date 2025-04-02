import { Component } from '@angular/core';
import { 
  LineSeriesService,
  CategoryService,
  LegendService,
  TooltipService,
  StripLineService,
  DataLabelService,
  ChartAnnotationService,
  ILabelRenderEventsArgs
} from '@syncfusion/ej2-angular-charts';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-chart-pistolet-jaune-pdf',
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
  templateUrl: './chart-pistolet-jaune-pdf.component.html',
  styleUrl: './chart-pistolet-jaune-pdf.component.scss'
})
export class ChartPistoletJaunePDFComponent {
/***************************** Chart moyenne X *******************************************/
//public title: string = 'La Moyenne X̄';
public titleStyle: Object = {
  fontFamily: 'Arial',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#333'
};

// Configuration de l'axe X
public primaryXAxis: Object = {
  valueType: 'Category',
  majorGridLines: { width: 1 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 1 },
  labelIntersectAction: 'Rotate45',
  labelRotation: -45,
  labelStyle: { 
    color: 'transparent', // Rendre le texte invisible
    fontFamily: 'Arial',
    fontSize: '12px'
  },
  edgeLabelPlacement: 'Shift',
  lineStyle: { width: 0 } // Cacher la ligne de l'axe
};

// Configuration de l'axe Y
public primaryYAxis: Object = {
  minimum: 30,
  maximum: 50,
  interval: 1,
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
    { start: 30, end: 34, color: 'rgba(255, 0, 0, 0.43)', zIndex: 'Behind' },
    { start: 34, end: 35, color: 'rgba(255, 255, 0, 0.64)', zIndex: 'Behind' },
    { start: 35, end: 45, color: 'rgba(0, 200, 0, 0.53)', zIndex: 'Behind' },
    { start: 45, end: 46, color: 'rgba(255, 255, 0, 0.64)', zIndex: 'Behind' },
    { start: 46, end: 50, color: 'rgba(255, 0, 0, 0.43)', zIndex: 'Behind' },
    
    // Lignes rouges
    { 
      start: 34, 
      end: 34.1, 
      color: 'red', 
      zIndex: 'Over', // Important: doit être au-dessus
      border: { color: 'red', width: 2 },
      opacity: 1
    },
    { 
      start: 46, 
      end: 46.1, 
      color: 'red', 
      zIndex: 'Over', // Important: doit être au-dessus
      border: { color: 'red', width: 2 },
      opacity: 1
    },
    { 
      start: 40, 
      end: 40.1, 
      color: 'black', 
      zIndex: 'Over', // Important: doit être au-dessus
      border: { color: 'black', width: 1 },
      opacity: 1
    } , 
    {
      start: 45,
      end: 45.1,  // Léger décalage pour s'assurer que la ligne est visible
      color: 'black',
      width: 1,
      dashArray: '5,3',  // 5px de tiret, 3px d'espace
      zIndex: 'Over'
    },
    {
      start: 35,
      end: 35.1,
      color: 'black',
      width: 1,
      dashArray: '5,3',
      zIndex: 'Over'
    }
  ]
};

// Données de la série
public seriesMoyenne: Object[] = [
  { x: '2025-01-01', y: 45 }, { x: '2025-01-02', y: 40 }, { x: '2025-01-03', y: 46 },
  { x: '2025-01-04', y: 39 }, { x: '2025-01-05', y: 42 }, { x: '2025-01-06', y: 45 },
  { x: '2025-01-07', y: 42 }, { x: '2025-01-08', y: 49 }, { x: '2025-01-09', y: 41 },
  { x: '2025-01-10', y: 39 }, { x: '2025-01-11', y: 42 }, { x: '2025-01-12', y: 45 },
  { x: '2025-01-13', y: 42 }, { x: '2025-01-14', y: 49 }, { x: '2025-01-15', y: 41 },
  { x: '2025-01-16', y: 42 }, { x: '2025-01-17', y: 49 }, { x: '2025-01-18', y: 41 },
  { x: '2025-01-19', y: 45 }, { x: '2025-01-20', y: 40 }, { x: '2025-01-21', y: 46 },
  { x: '2025-01-22', y: 39 }, { x: '2025-01-23', y: 42 }, { x: '2025-01-24', y: 45 },



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
    y: '35',
    coordinateUnits: 'Point',
    region: 'Chart'
  },
  {
    content: '<div style="border-top: 1px dashed black; width: 100%;"></div>',
    x: '0%',
    y: '45',
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
//public titleEtendue: string = 'L\'étendue R';
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
maximum: 10, // Changé de 6 à 10 comme demandé
interval: 1,
stripLines: [{
 start: 3,
 end: 3.1,
 color: 'red',
 zIndex: 'Over',
 border: { color: 'red', width: 2 },
 opacity: 1
}],
};
public annotationsEtendue: Object[] = [{
content: '<div style="border-top: 2px solid red; width:100%"></div>',
x: '0%',
y: 3,
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
