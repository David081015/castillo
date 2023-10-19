# Codificación
**Botón**
```C
private void btnEjecutar_Click(object sender, EventArgs e)
{
    string cadena = txtExpresion.Text;
    if (radPre.Checked == true)
    {
        MessageBox.Show("Resutaldo: " + Prefijo(cadena));
    }
    if(radPos.Checked == true)
    {
        MessageBox.Show("Resutaldo: " + Postfijo(cadena));
    }
}
```
**Prefijo**
```C
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
            case 'a':
            case 'b':
            case 'c':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                s1 = s1 + carac;
                break;
            case '+':
            case '-':
            case '*':
            case '/':
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
```
**Postfijo**
```C
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
            case 'a':
            case 'b':
            case 'c':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                s1 = s1 + carac;
                break;
            case '+':
            case '-':
            case '*':
            case '/':
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
```