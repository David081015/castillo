# Codificación
```c
        public void ExpresionAritmetica()
        {
            for (int i = 0; i < Cadena.Length; i++)
            {
                if (i == 0)
                {
                    Inicio = Cadena[i].ToString() + " T1 =";
                }
                if (Cadena[i] == '=')
                {
                    Op = "T1" + " " + Cadena[i + 2] + " " + Cadena[i];
                    Global = Global + Op + " ";
                }
                if (Cadena[i] == '+' || Cadena[i] == '-' || Cadena[i] == '*' || Cadena[i] == '/')
                {
                    if (char.IsDigit(Cadena[i + 2]))
                    {
                        if (i + 3 < Cadena.Length)
                        {
                            if (char.IsDigit(Cadena[i + 3]))
                            {
                                Op = "T1" + " " + Cadena[i + 2] + Cadena[i + 3] + " " + Cadena[i];
                            }
                        }
                        else
                        {
                            Op = "T1" + " " + Cadena[i + 2] + " " + Cadena[i];
                        }
                    }
                    else
                    {
                        Op = "T1" + " " + Cadena[i + 2] + " " + Cadena[i];
                    }
                    Global = Global + Op + " ";
                }
            }
        }
```