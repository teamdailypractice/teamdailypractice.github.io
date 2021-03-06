var samples = {
	capitals: [
		{key:'Alabama', value: 'Montgomery'},
		{key:'Alaska', value: 'Juneau'},
		{key:'Arizona', value: 'Phoenix'},
		{key:'Arkansas', value: 'Little Rock'},
		{key:'California', value: 'Sacramento'},
		{key:'Colorado', value: 'Denver'},
		{key:'Connecticut', value: 'Hartford'},
		{key:'Delaware', value: 'Dover'},
		{key:'Florida', value: 'Tallahassee'},
		{key:'Georgia', value: 'Atlanta'},
		{key:'Hawaii', value: 'Honolulu'},
		{key:'Idaho', value: 'Boise'},
		{key:'Illinois', value: 'Springfield'},
		{key:'Indiana', value: 'Indianapolis'},
		{key:'Iowa', value: 'Des Moines'},
		{key:'Kansas', value: 'Topeka'},
		{key:'Kentucky', value: 'Frankfort'},
		{key:'Louisiana', value: 'Baton Rouge'},
		{key:'Maine', value: 'Augusta'},
		{key:'Maryland', value: 'Annapolis'},
		{key:'Massachusetts', value: 'Boston'},
		{key:'Michigan', value: 'Lansing'},
		{key:'Minnesota', value: 'Saint Paul'},
		{key:'Mississippi', value: 'Jackson'},
		{key:'Missouri', value: 'Jefferson City'},
		{key:'Montana', value: 'Helena'},
		{key:'Nebraska', value: 'Lincoln'},
		{key:'Nevada', value: 'Carson City'},
		{key:'New Hampshire', value: 'Concord'},
		{key:'New Jersey', value:'Trenton'},
		{key:'New Mexico', value: 'Santa Fe'},
		{key:'New York', value: 'Albany'},
		{key:'North Carolina', value: 'Raleigh'},
		{key:'North Dakota', value: 'Bismarck'},
		{key:'Ohio', value: 'Columbus'},
		{key:'Oklahoma', value: 'Oklahoma City'},
		{key:'Oregon', value: 'Salem'},
		{key:'Pennsylvania', value: 'Harrisburg'},
		{key:'Rhode Island', value: 'Providence'},
		{key:'South Carolina', value: 'Columbia'},
		{key:'South Dakota', value:	'Pierre'},
		{key:'Tennessee', value: 'Nashville'},
		{key:'Texas', value: 'Austin'},
		{key:'Utah', value: 'Salt Lake City'},
		{key:'Vermont', value: 'Montpelier'},
		{key:'Virginia', value: 'Richmond'},
		{key:'Washington', value: 'Olympia'},
		{key:'West Virginia', value: 'Charleston'},
		{key:'Wisconsin', value: 'Madison'},
		{key:'Wyoming', value: 'Cheyenne'}
	],

	chemSymbols: [
		{key:'Ac', value: 'Actinium'},
		{key:'Ag', value: 'Silver'},
		{key:'Al', value: 'Aluminium'},
		{key:'Am', value: 'Americium'},
		{key:'Ar', value: 'Argon'},
		{key:'As', value: 'Arsenic'},
		{key:'At', value: 'Astatine'},
		{key:'Au', value: 'Gold'},
		{key:'B', value: 'Boron'},
		{key:'Ba', value: 'Barium'},
		{key:'Be', value: 'Beryllium'},
		{key:'Bh', value: 'Bohrium'},
		{key:'Bi', value: 'Bismuth'},
		{key:'Bk', value: 'Berkelium'},
		{key:'Br', value: 'Bromine'},
		{key:'C', value: 'Carbon'},
		{key:'Ca', value: 'Calcium'},
		{key:'Cd', value: 'Cadmium'},
		{key:'Ce', value: 'Cerium'},
		{key:'Cf', value: 'Californium'},
		{key:'Cl', value: 'Chlorine'},
		{key:'Cm', value: 'Curium'},
		{key:'Cn', value: 'Copernicium'},
		{key:'Co', value: 'Cobalt'},
		{key:'Cr', value: 'Chromium'},
		{key:'Cs', value: 'Caesium'},
		{key:'Cu', value: 'Copper'},
		{key:'Db', value: 'Dubnium'},
		{key:'Ds', value: 'Darmstadtium'},
		{key:'Dy', value: 'Dysprosium'},
		{key:'Er', value: 'Erbium'},
		{key:'Es', value: 'Einsteinium'},
		{key:'Eu', value: 'Europium'},
		{key:'F', value: 'Fluorine'},
		{key:'Fe', value: 'Iron'},
		{key:'Fl', value: 'Flerovium'},
		{key:'Fm', value: 'Fermium'},
		{key:'Fr', value: 'Francium'},
		{key:'Ga', value: 'Gallium'},
		{key:'Gd', value: 'Gadolinium'},
		{key:'Ge', value: 'Germanium'},
		{key:'H', value: 'Hydrogen'},
		{key:'He', value: 'Helium'},
		{key:'Hf', value: 'Hafnium'},
		{key:'Hg', value: 'Mercury'},
		{key:'Ho', value: 'Holmium'},
		{key:'Hs', value: 'Hassium'},
		{key:'I', value: 'Iodine'},
		{key:'In', value: 'Indium'},
		{key:'Ir', value: 'Iridium'},
		{key:'K', value: 'Potassium'},
		{key:'Kr', value: 'Krypton'},
		{key:'La', value: 'Lanthanum'},
		{key:'Li', value: 'Lithium'},
		{key:'Lr', value: 'Lawrencium'},
		{key:'Lu', value: 'Lutetium'},
		{key:'Lv', value: 'Livermorium'},
		{key:'Md', value: 'Mendelevium'},
		{key:'Mg', value: 'Magnesium'},
		{key:'Mn', value: 'Manganese'},
		{key:'Mo', value: 'Molybdenum'},
		{key:'Mt', value: 'Meitnerium'},
		{key:'N', value: 'Nitrogen'},
		{key:'Na', value: 'Sodium'},
		{key:'Nb', value: 'Niobium'},
		{key:'Nd', value: 'Neodymium'},
		{key:'Ne', value: 'Neon'},
		{key:'Ni', value: 'Nickel'},
		{key:'No', value: 'Nobelium'},
		{key:'Np', value: 'Neptunium'},
		{key:'O', value: 'Oxygen'},
		{key:'Os', value: 'Osmium'},
		{key:'P', value: 'Phosphorus'},
		{key:'Pa', value: 'Protactinium'},
		{key:'Pb', value: 'Lead'},
		{key:'Pd', value: 'Palladium'},
		{key:'Pm', value: 'Promethium'},
		{key:'Po', value: 'Polonium'},
		{key:'Pr', value: 'Praseodymium'},
		{key:'Pt', value: 'Platinum'},
		{key:'Pu', value: 'Plutonium'},
		{key:'Ra', value: 'Radium'},
		{key:'Rb', value: 'Rubidium'},
		{key:'Re', value: 'Rhenium'},
		{key:'Rf', value: 'Rutherfordium'},
		{key:'Rg', value: 'Roentgenium'},
		{key:'Rh', value: 'Rhodium'},
		{key:'Rn', value: 'Radon'},
		{key:'Ru', value: 'Ruthenium'},
		{key:'S', value: 'Sulfur'},
		{key:'Sb', value: 'Antimony'},
		{key:'Sc', value: 'Scandium'},
		{key:'Se', value: 'Selenium'},
		{key:'Sg', value: 'Seaborgium'},
		{key:'Si', value: 'Silicon'},
		{key:'Sm', value: 'Samarium'},
		{key:'Sn', value: 'Tin'},
		{key:'Sr', value: 'Strontium'},
		{key:'Ta', value: 'Tantalum'},
		{key:'Tb', value: 'Terbium'},
		{key:'Tc', value: 'Technetium'},
		{key:'Te', value: 'Tellurium'},
		{key:'Th', value: 'Thorium'},
		{key:'Ti', value: 'Titanium'},
		{key:'Tl', value: 'Thallium'},
		{key:'Tm', value: 'Thulium'},
		{key:'U', value: 'Uranium'},
		{key:'Uuo', value: 'Ununoctium'},
		{key:'Uup', value: 'Ununpentium'},
		{key:'Uus', value: 'Ununseptium'},
		{key:'Uut', value: 'Ununtrium'},
		{key:'V', value: 'Vanadium'},
		{key:'W', value: 'Tungsten'},
		{key:'Xe', value: 'Xenon'},
		{key:'Y', value: 'Yttrium'},
		{key:'Yb', value: 'Ytterbium'},
		{key:'Zn', value: 'Zinc'},
		{key:'Zr', value: 'Zirconium'}
	],

	spanishWords: [
		{key:'escuela', value:'school'},
		{key:'manzana', value:'apple'},
		{key:'mesa', value:'table'},
		{key:'verde', value:'green'},
		{key:'nariz', value:'nose'},
		{key:'ciencia', value:'science'},
		{key:'biblioteca', value:'library'},
		{key:'m??dico', value:'doctor'},
		{key:'queso', value:'cheese'},
		{key:'puerta', value:'door'},
		{key:'coche', value:'car'},
		{key:'??rbol', value:'tree'},
		{key:'playa', value:'beach'},
		{key:'brazo', value:'arm'},
		{key:'perro', value:'dog'},
		{key:'maestro', value:'teacher'},
		{key:'ojo', value:'eye'},
		{key:'ventana', value:'window'},
		{key:'azul', value:'blue'},
		{key:'rojo', value:'red'},
		{key:'gato', value:'cat'},
		{key:'libro', value:'book'},
		{key:'amarillo', value:'yellow'},
		{key:'blanco', value:'white'},
		{key:'boca', value:'mouth'},
		{key:'cabeza', value:'head'}
	]
};
