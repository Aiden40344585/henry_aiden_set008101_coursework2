// Aiden Henry 40344585
// Encryption and Decryption Website INDEX JavaScript file
// Coursework SET08101 Assesment 2

// Research and Sources
// js slice arrays		https://www.w3schools.com/jsref/jsref_slice_array.asp
// js modulus		    https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
//			            https://www.w3schools.com/js/js_arithmetic.asp
//			            https://www.w3schools.com/jsref/jsref_obj_math.asp
// js regex		        https://www.w3schools.com/jsref/jsref_obj_regexp.asp
// js image display	    https://www.w3schools.com/css/tryit.asp?filename=trycss_float_images_side
// js base64 encoding	https://www.google.com/search?q=base+64+encoding&oq=base+64+encoding&aqs=chrome..69i57.9527j0j4&sourceid=chrome&ie=UTF-8


function user_login()
{
    var user_details = ["user", "pwd"]
    user_details.splice(1, 0, document.getElementById('user_name').value);
    user_details.splice(3, 0, document.getElementById('password').value);
    var data = JSON.stringify(user_details)
    console.log(data)

    var request = new XMLHttpRequest();
    request.open('POST', '/login', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(data);
    
}

function caesar()
{
    // declaring variables
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var input = document.getElementById("caesar_plain_text").value; // getting Value of Input
    var shift = document.getElementById("caesar_key_value").value; // getting Value of Input
    var plaintext = input.toUpperCase(); 
    var ciphertext = "";

    // start, match any lower/upper case char for one or more times, end
    var regex = /^[a-zA-Z]+$/;
    // match only numbers
    var num_regex = /^[0-9]+$/;
    
    // if input of text and number is true carry on
    if ((regex.test(plaintext) == true) && (num_regex.test(shift) == true))
    {
        for (var i =0; i < plaintext.length; i++)
        {
            // selecting letter of plaintext word
            letter = plaintext.charAt(i); 

            // change value into intiger
            position = parseInt(charset.indexOf(letter),10);
            shift_num = parseInt(shift);
            
            // add shift value to letter position, getting char mod length of charset
            position += shift_num;
            newposition = Math.abs(position) % charset.length;
            newletter = charset[newposition];
            ciphertext += newletter;
        }
        document.getElementById("caesar_cipher_text").innerHTML = ciphertext;   
    }
    else    // not correct input
    {
        document.getElementById("caesar_cipher_text").innerHTML = "Sorry that is not a correct input"
    }    
}

function decrypt_caesar()
{
    // declaring variables
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var input = document.getElementById("caesar_plain_text").value; // getting value of input
    var ciphertext = input.toUpperCase();
    var plaintext = "";
    var key = 0;

    // start, match any lower case char for one or more times, end
    var regex = /^[a-zA-Z]+$/;
 
    if (regex.test(ciphertext) == true)
    {
        for (key = 0; key <= charset.length; key++)
        {
            plaintext = "";
            for(var i =0; i < ciphertext.length; i++)
            {   
                // selecting letter of ciphertext word and assigning key shift
                letter = ciphertext.charAt(i); 

                // finding positions of selected ciphertext and key word letters
                cipher_pos = parseInt(charset.indexOf(letter),10);
          
                // creating plain text
                plain_pos = (cipher_pos + key) % charset.length;
                plain_letter = charset[plain_pos];
                plaintext += plain_letter;
            }
            document.getElementById("caesar_cipher_text").innerHTML += 
                '<br>The Key number is '+key+' Output '+plaintext+'';
        }
    // reseting footer
    x = document.getElementById("foot_id");
        x.style.position = "relative";
    }
    else
    {
        document.getElementById("caesar_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}

function viginere()
{
    // declaring variables
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var input = document.getElementById("viginere_plain_text").value; // getting value of input
    var v_key_word = document.getElementById("viginere_key_value").value; // getting value of input
    var plaintext = input.toUpperCase();
    var v_key = v_key_word.toUpperCase();
    var ciphertext = "";

    // start, match any lower/upper case char for one or more times, end
    var regex = /^[a-zA-Z]+$/;
    var key = 0

    if ((regex.test(plaintext) == true) && (regex.test(v_key) == true))
    {
        for(var i =0; i < plaintext.length; i++)
        {
            // selecting letter of plaintext word
            letter = plaintext.charAt(i); 
            
            // selecting letter of key word with modulus of i (the iteration) 
            // and length of the key word
            var mod_key = Math.abs(i) % v_key.length;
            var key = v_key.charAt(mod_key);

            // finding positions of selected plaintext and key word letters
            plain_pos = parseInt(charset.indexOf(letter),10);
            key_pos = parseInt(charset.indexOf(key), 10);
            
            // creating cipher text
            cipher_pos = (plain_pos + key_pos) % charset.length;
            cipher_letter = charset[cipher_pos];
            ciphertext += cipher_letter;
        }
    document.getElementById("viginere_cipher_text").innerHTML = ciphertext;
    console.log(ciphertext)
    }
    else
    {
        document.getElementById("viginere_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}

function decrypt_viginere()
{
    // declaring variables
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var input = document.getElementById("viginere_plain_text").value; // getting value of input
    var v_key_word = document.getElementById("viginere_key_value").value; // getting value of input
    var ciphertext = input.toUpperCase();
    var v_key = v_key_word.toUpperCase();
    var plaintext = "";
    var key = 0;

    // start, match any lower/upper case char for one or more times, end
    var regex = /^[a-zA-Z]+$/;
 
    if ((regex.test(ciphertext) == true) && (regex.test(v_key) == true))
    {
        for(var i =0; i < ciphertext.length; i++)
        {
            // selecting letter of ciphertext word
            letter = ciphertext.charAt(i); 

            // selecting letter of key word with modulus of i (the iteration) 
            // and length of the key word
            var mod_key = Math.abs(i) % v_key.length;
            var key = v_key.charAt(mod_key);

            // finding positions of selected ciphertext and key word letters
            cipher_pos = parseInt(charset.indexOf(letter),10);
            key_pos = parseInt(charset.indexOf(key), 10);
          
            // creating plain text
            plain_pos = ((cipher_pos - key_pos) + charset.length) % charset.length;
            plain_letter = charset[plain_pos];
            plaintext += plain_letter;
        }
        document.getElementById("viginere_cipher_text").innerHTML = plaintext;
    }
    else
    {
        document.getElementById("viginere_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}

function adfgvx()
{
    // declaring variables
    var coloum = ["A","D","F","G","V","X"];
    var alpha = ["1","4","7","R","E","G"];
    var delta = ["I","M","N","T","A","B"];
    var foxtrot = ["C","D","F","H","J","K"];
    var golf = ["L","O","P","Q","S","U"];
    var victor = ["V","W","X","Y","Z","0"];
    var xray = ["2","3","5","6","8","9"];
    var input = document.getElementById("adfgvx_plain_text").value; // getting value of input 
    var plaintext = input.toUpperCase();
    var ciphertext = "";

     // start, match any number & lower/upper case char for one or more times, end
    var regex = /^[0-9a-zA-Z]+$/;

    if (regex.test(plaintext) == true)
    {
        for(i =0; i < plaintext.length; i++)
        {   
            // selecing letter
            letter = plaintext.charAt(i);
                
            // finding letter in arrays and getting location information      
            if (alpha.includes(letter))
                {let_pos = alpha.indexOf(letter);
                let_array = "A";}
            else if (delta.includes(letter))
                {let_pos = delta.indexOf(letter);
                let_array = "D";}
            else if (foxtrot.includes(letter))
                {let_pos = foxtrot.indexOf(letter);
                let_array = "F";}
            else if (golf.includes(letter))
                {let_pos = golf.indexOf(letter);
                let_array = "G";}
            else if (victor.includes(letter))
                {let_pos = victor.indexOf(letter);
                let_array = "V";}
            else if (xray.includes(letter))
                {let_pos = xray.indexOf(letter);
                let_array = "X";}
            
        // concat row and coloum
        let_coloum =  coloum[let_pos]
        var result = let_array + let_coloum;
        ciphertext += result;
        document.getElementById("adfgvx_cipher_text").innerHTML = ciphertext;
        }
    }
    else
    {
        document.getElementById("adfgvx_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}

function decrypt_adfgvx()
{
    // declaring variables
    var column = ["A","D","F","G","V","X"];
    var a = ["1","4","7","R","E","G"];
    var d = ["I","M","N","T","A","B"];
    var f = ["C","D","F","H","J","K"];
    var g = ["L","O","P","Q","S","U"];
    var v = ["V","W","X","Y","Z","0"];
    var x = ["2","3","5","6","8","9"];
    var input = document.getElementById("adfgvx_plain_text").value; // getting value of input 
    var ciphertext = input.toUpperCase();
    var plaintext = "";
    var let_double = "";

    // start, match any number & lower/upper case char for one or more times, end
    var regex = /^[a-zA-Z]+$/;

    if (regex.test(ciphertext) == true)
    {
        for (i =0; i < ciphertext.length; i++)
        {
            // selecing letter
            letter = ciphertext.charAt(i);   
            let_double += letter;

            // finding location of plaintext, 2 ciphertext at a time for row & column
            if (let_double.length == 2)
            {
                let_column = let_double[0];
                let_row = let_double[1];
                let_double = "";
                
                // locating the letter position in the row
                let_pos = column.indexOf(let_row);
                
                // selecting column
                if (let_column == "A")
                    {let_plain = a[let_pos];
                    plaintext += let_plain;}
                else if (let_column == "D")
                    {let_plain = d[let_pos];
                    plaintext += let_plain;}
                else if (let_column == "F")
                    {let_plain = f[let_pos];
                    plaintext += let_plain;}
                else if (let_column == "G")
                    {let_plain = g[let_pos];
                    plaintext += let_plain;}
                else if (let_column == "V")
                    {let_plain = v[let_pos];
                    plaintext += let_plain;}
                else if (let_column == "X")
                    {let_plain = x[let_pos];
                    plaintext += let_plain;}      
            }
            document.getElementById("adfgvx_cipher_text").innerHTML = plaintext;
        }
    }
    else
    {
        document.getElementById("adfgvx_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}

function templar()
{
    // declaring variables 
    var input = document.getElementById("templar_plain_text").value; // getting value of input 
    var plaintext = input.toLowerCase();
    document.getElementById("templar_cipher_text").innerHTML = "";
    var alphabet = {"a":"temple_A.png","b":"temple_B.png",
                    "c":"temple_C.png","d":"temple_D.png",
                    "e":"temple_E.png","f":"temple_F.png",
                    "g":"temple_G.png","h":"temple_H.png",
                    "i":"temple_I.png","j":"temple_J.png",
                    "k":"temple_K.png","l":"temple_L.png",
                    "m":"temple_M.png","n":"temple_N.png",
                    "o":"temple_O.png","p":"temple_P.png",
                    "q":"temple_Q.png","r":"temple_R.png",
                    "s":"temple_S.png","t":"temple_T.png",
                    "u":"temple_U.png","v":"temple_V.png",
                    "w":"temple_W.png","x":"temple_X.png",
                    "y":"temple_Y.png","z":"temple_Z.png"};

     // start, match any number & lower/upper case char for one or more times -J as templar 
     // cipher has no j symbol, end
    var regex = /^[0-9a-ik-zA-IK-Z]+$/;
    
    if (regex.test(plaintext) == true)
    {
        for (i =0; i < plaintext.length; i++)
        {
            // selecing letter and retrieving image file name
            letter = plaintext.charAt(i);
            let_file = alphabet[letter];
            
            // displaying image file
            document.getElementById("templar_cipher_text").innerHTML += 
                '<img src="images/'+let_file+'"></img>'
        }
        // reseting footer
        x = document.getElementById("foot_id");
            x.style.position = "absolute";
    }
    else
    {
        document.getElementById("templar_cipher_image").innerHTML = "Sorry that is not a correct input"
    }
}

function base64()
{
    // declaring variables 
    var input = document.getElementById("base64_plain_text").value; // getting value of input 
    var plaintext = input.toLowerCase();
    var ciphertext = "";

    // start, match any number, lower/upper case char & white space for one or more times, end
    var regex = /^[0-9a-zA-Z\s]+$/;

    if (regex.test(plaintext) == true)
    {
        var ciphertext = btoa(plaintext);
        document.getElementById("base64_cipher_text").innerHTML = ciphertext;
    }
    else
    {
        document.getElementById("base64_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}

function decrypt_base64()
{
    // declaring variables 
    var ciphertext = document.getElementById("base64_plain_text").value; // getting value of input 
    var plaintext = "";
    // start, match any number, lower/upper case char & white space for one or more times, end
    var regex = /^[0-9a-zA-Z=+/]+$/;

    if (regex.test(ciphertext) == true)
    {
        var plaintext = atob(ciphertext);
        document.getElementById("base64_cipher_text").innerHTML = plaintext;
    }
    else
    {
        document.getElementById("base64_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}

function morse_code()
{
    // declaring variables 
    var input = document.getElementById("morse_plain_text").value; // getting value of input 
    var plaintext = input.toLowerCase();
    var ciphertext = ""
    var alphabet = {"a":".-","b":"-...",
                    "c":"-.-.","d":"-..",
                    "e":".","f":"..-.",
                    "g":"--.","h":"....",
                    "i":"..","j":".---",
                    "k":"-.-","l":".-..",
                    "m":"--","n":"-.",
                    "o":"---","p":".--.",
                    "q":"--.-","r":".-.",
                    "s":"...","t":"-",
                    "u":"..-","v":"...-",
                    "w":".--","x":"-..-",
                    "y":"--.-","z":"--.."};

     // start, match any number & lower/upper case char for one or more times, end
    var regex = /^[a-zA-Z\s]+$/;

    if (regex.test(plaintext) == true)
    {
        for (i =0; i < plaintext.length; i++)
        {
            // converting letter into morse and adding white space
            letter = plaintext.charAt(i);
            if (letter == " ")
            {
                ciphertext += " ";
            }
            else
            {
            morse = alphabet[letter];
            ciphertext += morse + " ";
            }
        }
        console.log(ciphertext)
        document.getElementById("morse_cipher_text").innerHTML = ciphertext;
    }
    else
    {
        document.getElementById("morse_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}

function decrypt_morse()
{
    // declaring variables 
    var ciphertext = document.getElementById("morse_plain_text").value; // getting value of input 
    var plaintext = "";
    var let_plain = "";
    var letter = [];
    var alphabet = {".-":"A","-...":"B",
                    "-.-.":"C","-..":"D",
                    ".":"E","..-.":"F",
                    "--.":"G","....":"H",
                    "..":"I",".---":"J",
                    "-.-":"K",".-..":"L",
                    "--":"M","-.":"N",
                    "---":"O",".--.":"P",
                    "--.-":"Q",".-.":"R",
                    "...":"S","-":"T",
                    "..-":"U","...-":"V",
                    ".--":"W","-..-":"X",
                    "--.-":"Y","--..":"Z"};

     // start, match dot, dash char and white space for one or more times, end
    var regex = /^[.-\s]+$/;

    if (regex.test(ciphertext) == true)
    {
        // take ciphertext and convert to an array, splicing at white space
        letter.push(ciphertext.split(' '));
        
        // find length of array for the for loop
        let_morse = letter[0];

        for (i =0; i < let_morse.length; i++)
        {
            let_plain = alphabet[let_morse[i]];
            plaintext += let_plain;
        }
        console.log(plaintext)
        document.getElementById("morse_cipher_text").innerHTML = plaintext;
    }
    else
    {
        document.getElementById("morse_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}

function polybius()
{
    // declaring variables
    var coloum = ["1","2","3","4","5"];
    var one = ["a","b","c","d","e"];
    var two = ["f","g","h","i" || "j","k"];
    var three = ["l","m","n","o","p"];
    var four = ["q","r","s","t","u"];
    var five = ["v","w","x","y","z"];
    
    var input = document.getElementById("polybius_plain_text").value; // getting value of input 
    var plaintext = input.toLowerCase();
    var ciphertext = "";

     // start, match any number & lower/upper case char for one or more times, end
    var regex = /^[a-zA-Z]+$/;

    if (regex.test(plaintext) == true)
    {
        for(i =0; i < plaintext.length; i++)
        {   
            // selecing letter
            letter = plaintext.charAt(i);
                
            // finding letter in arrays and getting location information      
            if (one.includes(letter))
                {let_pos = one.indexOf(letter);
                let_array = "1";}
            else if (two.includes(letter))
                {let_pos = two.indexOf(letter);
                let_array = "2";}
            else if (three.includes(letter))
                {let_pos = three.indexOf(letter);
                let_array = "3";}
            else if (four.includes(letter))
                {let_pos = four.indexOf(letter);
                let_array = "4";}
            else if (five.includes(letter))
                {let_pos = five.indexOf(letter);
                let_array = "5";}
            
            // concat row and coloum
            let_coloum =  coloum[let_pos]
            var result = let_array + let_coloum;
            ciphertext += result;
        }
        document.getElementById("polybius_cipher_text").innerHTML = ciphertext;
    }
    else
    {
        document.getElementById("polybius_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}


function decrypt_polybius()
{
    // declaring variables
    var one = ["A","B","C","D","E"];
    var two = ["F","G","H","I/J","K"];
    var three = ["L","M","N","O","P"];
    var four = ["Q","R","S","T","U"];
    var five = ["V","W","X","Y","Z"];
    var ciphertext = document.getElementById("polybius_plain_text").value; // getting value of input 
    var plaintext = "";
    var let_double = "";

    // start, match any number one or more times, end
    var regex = /^[0-9]+$/;

    if (regex.test(ciphertext) == true)
    {
        for (i =0; i < ciphertext.length; i++)
        {
            // selecing letter
            letter = ciphertext.charAt(i);   
            let_double += letter;

            // finding location of plaintext, 2 ciphertext at a time for row & column
            if (let_double.length == 2)
            {
                let_column = (parseInt(let_double[1],10) - 1);
                let_row = let_double[0];
                let_double = "";

                // selecting column
                if (let_row == "1")
                    {let_plain = one[let_column];
                    plaintext += let_plain;}
                else if (let_row == "2")
                    {let_plain = two[let_column];
                    plaintext += let_plain;}
                else if (let_row == "3")
                    {let_plain = three[let_column];
                    plaintext += let_plain;}
                else if (let_row == "4")
                    {let_plain = four[let_column];
                    plaintext += let_plain;}
                else if (let_row == "5")
                    {let_plain = five[let_column];
                    plaintext += let_plain;}
            }
        }
        document.getElementById("polybius_cipher_text").innerHTML = plaintext;
    }
    else
    {
        document.getElementById("polybius_cipher_text").innerHTML = "Sorry that is not a correct input"
    }
}

// Select cipher and show / hide hmtl elements
function caesar_select() 
{
    document.getElementById("caesar_cipher_text").innerHTML = "";
    var x = document.getElementById("welcome");
        x.style.display = "none";
    var x = document.getElementById("viginere");
        x.style.display = "none";
    var x = document.getElementById("morse");
        x.style.display = "none";
    var x = document.getElementById("templar");
        x.style.display = "none";
    var x = document.getElementById("base64");
        x.style.display = "none";
    var x = document.getElementById("adfgvx");
        x.style.display = "none";
    var x = document.getElementById("polybius");
        x.style.display = "none";
    var x = document.getElementById("users");
        x.style.display = "none";

    var x = document.getElementById("caesar");
    if (x.style.display === "none") 
    {
        x.style.display = "block";
    } 
    else 
    {
        x.style.display = "none";
    }
}

function viginere_select() 
{
    document.getElementById("viginere_cipher_text").innerHTML = "";
    var x = document.getElementById("welcome");
        x.style.display = "none";
    var x = document.getElementById("caesar");
        x.style.display = "none";
    var x = document.getElementById("morse");
        x.style.display = "none";
    var x = document.getElementById("templar");
        x.style.display = "none";
    var x = document.getElementById("base64");
        x.style.display = "none";
    var x = document.getElementById("adfgvx");
        x.style.display = "none";
    var x = document.getElementById("polybius");
        x.style.display = "none";
    var x = document.getElementById("users");
        x.style.display = "none";

    var x = document.getElementById("viginere");
    if (x.style.display === "none") 
    {
        x.style.display = "block";
    } 
    else 
    {
        x.style.display = "none";
    }
}

function adfgvx_select() 
{
    document.getElementById("adfgvx_cipher_text").innerHTML = "";
    var x = document.getElementById("welcome");
        x.style.display = "none";
    var x = document.getElementById("viginere");
        x.style.display = "none";
    var x = document.getElementById("morse");
        x.style.display = "none";
    var x = document.getElementById("templar");
        x.style.display = "none";
    var x = document.getElementById("base64");
        x.style.display = "none";
    var x = document.getElementById("caesar");
        x.style.display = "none";
    var x = document.getElementById("polybius");
        x.style.display = "none";
    var x = document.getElementById("users");
        x.style.display = "none";


    var x = document.getElementById("adfgvx");
    if (x.style.display === "none") 
    {
        x.style.display = "block";
    } 
    else 
    {
        x.style.display = "none";
    }
}

function templar_select() 
{
    document.getElementById("templar_cipher_text").innerHTML = "";
    var x = document.getElementById("welcome");
        x.style.display = "none";
    var x = document.getElementById("viginere");
        x.style.display = "none";
    var x = document.getElementById("morse");
        x.style.display = "none";
    var x = document.getElementById("caesar");
        x.style.display = "none";
    var x = document.getElementById("base64");
        x.style.display = "none";
    var x = document.getElementById("adfgvx");
        x.style.display = "none";
    var x = document.getElementById("polybius");
        x.style.display = "none";
    var x = document.getElementById("users");
        x.style.display = "none";

    var x = document.getElementById("templar");
    if (x.style.display === "none") 
    {
        x.style.display = "block";
    } 
    else 
    {
        x.style.display = "none";
    }
}

function morse_select() 
{
    document.getElementById("morse_cipher_text").innerHTML = "";
    var x = document.getElementById("welcome");
        x.style.display = "none";
    var x = document.getElementById("viginere");
        x.style.display = "none";
    var x = document.getElementById("caesar");
        x.style.display = "none";
    var x = document.getElementById("templar");
        x.style.display = "none";
    var x = document.getElementById("base64");
        x.style.display = "none";
    var x = document.getElementById("adfgvx");
        x.style.display = "none";
    var x = document.getElementById("polybius");
        x.style.display = "none";
    var x = document.getElementById("users");
        x.style.display = "none";

    var x = document.getElementById("morse");
    if (x.style.display === "none") 
    {
        x.style.display = "block";
    } 
    else 
    {
        x.style.display = "none";
    }
}

function base64_select() 
{
    document.getElementById("base64_cipher_text").innerHTML = "";
    var x = document.getElementById("welcome");
        x.style.display = "none";
    var x = document.getElementById("viginere");
        x.style.display = "none";
    var x = document.getElementById("morse");
        x.style.display = "none";
    var x = document.getElementById("templar");
        x.style.display = "none";
    var x = document.getElementById("caesar");
        x.style.display = "none";
    var x = document.getElementById("adfgvx");
        x.style.display = "none";
    var x = document.getElementById("polybius");
        x.style.display = "none";
    var x = document.getElementById("users");
        x.style.display = "none";

    var x = document.getElementById("base64");
    if (x.style.display === "none") 
    {
        x.style.display = "block";
    } 
    else 
    {
        x.style.display = "none";
    }
}

function polybius_select() 
{
    document.getElementById("polybius_cipher_text").innerHTML = "";
    var x = document.getElementById("welcome");
        x.style.display = "none";
    var x = document.getElementById("viginere");
        x.style.display = "none";
    var x = document.getElementById("morse");
        x.style.display = "none";
    var x = document.getElementById("templar");
        x.style.display = "none";
    var x = document.getElementById("base64");
        x.style.display = "none";
    var x = document.getElementById("adfgvx");
        x.style.display = "none";
    var x = document.getElementById("caesar");
        x.style.display = "none";
    var x = document.getElementById("users");
        x.style.display = "none";
    
    var x = document.getElementById("polybius");
    if (x.style.display === "none") 
    {
        x.style.display = "block";
    } 
    else 
    {
        x.style.display = "none";
    }
}

function user_select() 
{
    document.getElementById("message_text").innerHTML = "";
    var x = document.getElementById("welcome");
        x.style.display = "none";
    var x = document.getElementById("viginere");
        x.style.display = "none";
    var x = document.getElementById("morse");
        x.style.display = "none";
    var x = document.getElementById("templar");
        x.style.display = "none";
    var x = document.getElementById("base64");
        x.style.display = "none";
    var x = document.getElementById("adfgvx");
        x.style.display = "none";
    var x = document.getElementById("caesar");
        x.style.display = "none";
    var x = document.getElementById("polybius");
        x.style.display = "none";

    var x = document.getElementById("users");
    if (x.style.display === "none") 
    {
        x.style.display = "block";
    } 
    else 
    {
        x.style.display = "none";
    }
}
