
// ajout d'une nouvelle méthode au prototype Number pour arrondir à
// 2 chiffres après la virgule

Number.prototype.toFixedNumber = function(x, base = 2){
  const pow = Math.pow(base||10,x);
  return +( Math.round(this*pow) / pow );
};

