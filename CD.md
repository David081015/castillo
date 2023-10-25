# Codificación
**Botón**
```C
 #region Postfija/Prefija
 string Codificado;

 string SimplificarExpresion(string expresion)
 {
     // Realiza otros reemplazos según tus necesidades
     expresion = expresion.Replace("INICIO", "");
     // Elimina "ENTERO" seguido de una variable
     expresion = Regex.Replace(expresion, "ENTERO @\\w+", "");
     expresion = Regex.Replace(expresion, "REAL @\\w+", "");
     expresion = expresion.Replace("FIN", "");

     // Reemplaza los caracteres '@' por una cadena vacía
     expresion = expresion.Replace("@", "");

     // Realiza una serie de reemplazos para simplificar la expresión matemática
     expresion = expresion.Replace("(", "");
     expresion = expresion.Replace(")", "");

     return expresion;
 }
 public void CadenaInfija()
 {
     string[] lineas = rtxFuente.Text.Split('\n');
     // Procesa cada línea y simplifica las expresiones
     string resultado = "";
     foreach (string linea in lineas)
     {
         if (!string.IsNullOrEmpty(linea))
         {
             resultado += SimplificarExpresion(linea);
         }
     }
     txtExpresionInfija.Text = resultado;
     txtTokensInfijos.Text = Decodificador(txtExpresionInfija.Text);
 }

 static string Prefijo(string Entrada)
 {
     string s1 = null, s2 = null, s3 = null, aux1 = null;
     int largo = 0, parcial = 1, ll = 0, jc = 0, ja = 0, lo, laux = 0, largo2 = 0, ce1 = 1, conta = 0;
     char oo, carac2 = ' ';

     largo = Entrada.Length;
     while (parcial <= largo)
     {
         char carac;
         carac = Convert.ToChar(Entrada.Substring(parcial - 1, 1));

         switch (carac)
         {
             case var _ when char.IsLetter(carac):
             case var _ when char.IsDigit(carac):
                 s1 = s1 + carac;
                 break;
             case '+':
             case '-':
             case '*':
             case '/':
             case '=':
                 if (ll == 0)
                 {
                     aux1 = carac + aux1;
                     ll = 1;
                 }
                 else
                 {
                     lo = aux1.Length - 1;
                     //Aqui se debe tomar el ultimo caracter y no el primero
                     oo = Convert.ToChar(aux1.Substring(0, 1));
                     jc = carac;
                     ja = oo;
                     if (jc > ja)
                     {
                         aux1 = "";

                         aux1 = Convert.ToString(oo);
                         s1 = s1.Substring(0, s1.Length - 1) + carac + s1.Substring(s1.Length - 1, 1);
                     }
                     else
                     {
                         if (jc == ja)
                         {
                             aux1 = "";
                             aux1 = aux1 + carac + oo;
                         }
                         else
                         {
                             s1 = aux1 + s1;
                             aux1 = Convert.ToString(carac);
                         }
                     }
                 }
                 break;
             case '(':
                 largo2 = parcial;
                 while (ce1 != 0)
                 {
                     carac2 = Convert.ToChar(Entrada.Substring(largo2, 1));
                     s2 = s2 + carac2;
                     conta++;
                     largo2++;
                     switch (carac2)
                     {
                         case '(':
                             ce1++;
                             break;
                         case ')':
                             ce1--;
                             break;
                     }
                 }
                 s2 = s2.Substring(0, conta - 1);
                 s3 = Prefijo(s2);
                 s1 = s1 + s3;
                 s2 = null;
                 conta = 0;
                 ce1 = 1;
                 parcial = largo2;
                 break;
         }
         parcial++;
     }
     s1 = aux1 + s1;
     return s1;
 }
 static string Postfijo(string Entrada)
 {
     string s1 = null, s2 = null, s3 = null, aux1 = null;
     int largo = 0, parcial = 1, ll = 0, jc = 0, ja = 0, lo, laux = 0, largo2 = 0, ce1 = 1, conta = 0;
     char oo, carac2 = ' ';

     largo = Entrada.Length;
     while (parcial <= largo)
     {
         char carac;
         carac = Convert.ToChar(Entrada.Substring(parcial - 1, 1));

         switch (carac)
         {
             case var _ when char.IsLetter(carac):
             case var _ when char.IsDigit(carac):
                 s1 = s1 + carac;
                 break;
             case '+':
             case '-':
             case '*':
             case '/':
             case '=':
                 if (ll == 0)
                 {
                     aux1 = aux1 + carac;
                     ll = 1;
                 }
                 else
                 {
                     lo = aux1.Length - 1;
                     //Aqui se debe tomar el ultimo caracter y no el primero
                     oo = Convert.ToChar(aux1.Substring(0, 1));
                     jc = carac;
                     ja = oo;
                     if (jc > ja)
                     {
                         aux1 = "";
                         aux1 = aux1 + carac + oo;
                     }
                     else
                     {
                         if (jc == ja)
                         {
                             s1 = s1 + aux1.Substring(0, 1);
                             laux = aux1.Length;
                             aux1 = aux1.Substring(1, laux - 1);
                             aux1 = carac + aux1;
                         }
                         else
                         {
                             s1 = s1 + aux1;
                             aux1 = Convert.ToString(carac);
                         }
                     }
                 }
                 break;
             case '(':
                 largo2 = parcial;
                 while (ce1 != 0)
                 {
                     carac2 = Convert.ToChar(Entrada.Substring(largo2, 1));
                     s2 = s2 + carac2;
                     conta++;
                     largo2++;
                     switch (carac2)
                     {
                         case '(':
                             ce1++;
                             break;
                         case ')':
                             ce1--;
                             break;
                     }
                 }
                 s2 = s2.Substring(0, conta - 1);
                 s3 = Postfijo(s2);
                 s1 = s1 + s3;
                 s2 = null;
                 conta = 0;
                 ce1 = 1;
                 parcial = largo2;
                 break;
         }
         parcial++;
     }
     s1 = s1 + aux1;
     return s1;
 }

 private void btnPos_Click(object sender, EventArgs e)
 {
     Codificado = Postfijo(txtExpresionInfija.Text);
     StringBuilder output = new StringBuilder();

     foreach (char c in Codificado)
     {
         output.Append(c); // Agregar el carácter original
         output.Append(' '); // Agregar un espacio después de cada carácter
     }

     string CodificadoConEspacio = output.ToString().Trim(); // Eliminar el espacio adicional al final
     txtExpresionResultado.Text = CodificadoConEspacio;
     txtTokensResultado.Text = Decodificador(CodificadoConEspacio);
 }

 private void btnPre_Click(object sender, EventArgs e)
 {
     Codificado = Prefijo(txtExpresionInfija.Text);
     StringBuilder output = new StringBuilder();

     foreach (char c in Codificado)
     {
         output.Append(c); // Agregar el carácter original
         output.Append(' '); // Agregar un espacio después de cada carácter
     }

     string CodificadoConEspacio = output.ToString().Trim(); // Eliminar el espacio adicional al final
     txtExpresionResultado.Text = CodificadoConEspacio;
     txtTokensResultado.Text = Decodificador(CodificadoConEspacio);
 }

 public static string Decodificador(string C)
 {
     // Reemplazar letras por "IDEN"
     C = Regex.Replace(C, "[A-Za-z]", "IDEN");

     // Reemplazar los operadores y caracteres específicos
     C = C.Replace("+", "OA01");
     C = C.Replace("-", "OA02");
     C = C.Replace("*", "OA03");
     C = C.Replace("/", "OA04");
     C = C.Replace("=", "OPAS");

     // Reemplazar números enteros por "COEN"
     C = Regex.Replace(C, @"\b\d+\b", "COEN");

     // Reemplazar números decimales por "CORE"
     C = Regex.Replace(C, @"\b\d+\.\d+\b", "CORE");

     return C;
 }

 #endregion
```