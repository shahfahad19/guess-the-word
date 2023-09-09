/*
HOW DOES THIS CODE WORKS?

* First of all a random word is selected from the array at bottom
* The code decides the number of blanks depending on the word length
* Mode 1 is for one blank, Mode 2 is for two blanks and Mode 3 is for three blanks
* It then select random letters in word that are to be blanked and save it in variables
* When user clicks Done, it compares the letters and shows correct if it matches.
*/

var firstLetter, secondLetter, thirdLetter, firstBlank, secondBlank, thirdBlank, word, temp, len, mode, newBlank, color= "#434343";
function loadWord() {
    $("#word").html("");
    var rnd = Math.floor(Math.random() * (words.length-1));
    word = words[rnd];
    len=word.length;
    
    //---Determine Number Of Blanks---//
    if (len<6)
        mode=1;
    else if (len>5 && len <=8) 
        mode =2;
    else if (len>8) 
        mode =3;
        
    //---Mode 1---//    
    if (mode==1) {
        firstBlank = Math.floor(Math.random() * len);
        for (i=0;i<len;i++) {
           if (i!=firstBlank) {
             $("#word").append('<input value="'+word[i]+'" type="text" readonly>');
           }
           else if (i==firstBlank){
             $("#word").append('<input type="text" onkeyup="moveToSecondBlank()" id="i1" maxlength="1">');
             firstLetter=word[i];
          }
        }
    }
    
    //---Mode 2---//
    else if (mode==2) {
        firstBlank = Math.floor(Math.random() * len);
    makeSecondBlank();
    if(firstBlank>secondBlank) {
        temp = firstBlank;
        firstBlank= secondBlank;
        secondBlank=temp;
    }
    if (firstBlank == 0 && secondBlank!=1)
     firstBlank=1;
    for (i=0;i<len;i++) {
        if (i!=firstBlank && i!=secondBlank) {
         $("#word").append('<input value="'+word[i]+'" type="text" readonly>');
         }
         else if (i==firstBlank){
            $("#word").append('<input onkeyup="moveToSecondBlank()" type="text" id="i1" maxlength="1">');
            firstLetter=word[i];
         }
         else if (i==secondBlank){
            $("#word").append('<input type="text" id="i2" onkeyup="moveToThirdBlank()" maxlength="1">');
            secondLetter=word[i];
         }
     }
     }
     
     //---Mode 3---//
     else if(mode==3) {
    firstBlank = Math.floor(Math.random() * len);
    makeSecondBlank();
    makeThirdBlank();
    if(secondBlank>thirdBlank) {
        temp = secondBlank;
        secondBlank = thirdBlank;
        thirdBlank = temp;
    }
    if(firstBlank>secondBlank) {
        temp = firstBlank;
        firstBlank= secondBlank;
        secondBlank=temp;
    }
    if(secondBlank>thirdBlank) {
        temp = secondBlank;
        secondBlank = thirdBlank;
        thirdBlank = temp;
    }
    if (firstBlank == 0 && secondBlank!=1)
        firstBlank=1;
        
    for (i=0;i<len;i++) {
        if (i!=firstBlank && i!=secondBlank && i!=thirdBlank) {
         $("#word").append('<input value="'+word[i]+'" type="text" readonly>');
         }
         else if (i==firstBlank){
            $("#word").append('<input type="text" id="i1" onkeyup="moveToSecondBlank()" maxlength="1">');
            firstLetter=word[i];
         }
         else if (i==secondBlank){
            $("#word").append('<input type="text" id="i2" onkeyup="moveToThirdBlank()" maxlength="1">');
            secondLetter=word[i];
         }
         else if (i==thirdBlank){
            $("#word").append('<input type="text" id="i3" onkeyup="lastBlank()" maxlength="1">');
            thirdLetter=word[i];
         }
     }
    }
    setTimeout(function() {
        $("#i1").focus();
        
    },2500);
}

function moveToSecondBlank() {
    if ($("#i1").val()==firstLetter) {
        $("#i1").css("color", color);
        $("#i1").attr('readonly', 'true');
        if ($("#i1").val().length == 1 & mode>1)
        $("#i2").focus();
    
    }
}

function moveToThirdBlank() {
    if ($("#i2").val()==secondLetter) {
        $("#i2").css("color", color);
        $("#i2").attr('readonly', 'true');
        if ($("#i2").val().length == 1 && mode > 2)
    $("#i3").focus();
    
    }
}

function lastBlank() {
    if ($("#i3").val()==thirdLetter) {
        $("#i3").css("color", color);
        $("#i3").attr('readonly', 'true');
    }
}

function makeSecondBlank() {
    newBlank = Math.floor(Math.random() * len);
    if (newBlank==firstBlank) {
        makeSecondBlank();
    }
    else {
        secondBlank = newBlank;
    }
}

function makeThirdBlank() {
    newBlank = Math.floor(Math.random() * len);
    if (newBlank==secondBlank || newBlank==firstBlank) {
        makeThirdBlank();
    }
    else {
        thirdBlank = newBlank;
    }
}

function check() {
    w1 = $("#i1").val();
    
    if (mode==1) {
        if (w1==firstLetter) ans("correct");
        else ans ("wrong");
    }
    
    else if (mode==2 || mode == 3) {
        w2 = $("#i2").val();
        if (w1==firstLetter && w2 ==secondLetter) ans("correct");
        else ans("wrong");
    }
    else if (mode==3) {
        w3 = $("#i3").val();
        if (w1==firstLetter && w2 ==secondLetter && w3==thirdLetter) ans("correct");
        else ans("wrong");
   }
}

function ans(res) {
    if (res=="correct") {
        Swal.fire({
            icon: 'success',
            title: 'Correct',
            text: 'Your answer is correct',
            showConfirmButton: false,
            timer: 1200,
            allowOutsideClick: false
        })
    }
    else if(res=="wrong") {
        Swal.fire({
            icon: 'error',
            title: 'Wrong',
            text: 'The correct answer is '+word.toUpperCase(),
            showConfirmButton: false,
            timer: 1200,
            allowOutsideClick: false
        })
    }
    loadWord();
    $(".main").hide();
    setTimeout(function() {
        $(".main").fadeIn(600);
    },1400);
}

$(document).on("keypress", "input", function(e) {
    if(e.which == 13) {
        check();
    }
});

var words= ["yellow", "indigo", "orange", "purple", "green", "brown", "black", "white", "apple", "fruit", "mango", "watermelon", "banana", "strawberry", "blueberry", "melon", "grapes", "pumpkin", "javascript", "vegetables", "color", "cricket", "football", "hockey", "swimming", "Pakistan", "china", "australia", "bangladesh", "india", "srilanka", "england", "africa", "afghanistan", "america", "newzeland", "country", "sweet", "bitter", "bigger", "small", "beautiful", "water", "ocean", "wrestling", "electricity", "government", "president", "classroom", "school", "college", "university", "library", "books", "hospital", "doctor", "patient", "nurse", "shirt", "short", "quick", "slowly", "quickly", "tower", "computer", "laptop", "mobile", "samsung", "house", "champion", "racecar", "vehicle", "engine", "powerful", "stone", "poverty", "foolish", "coding", "programming", "development", "accomplish", "accomplishment", "company", "tutor", "teacher", "student", "graduate", "sweat", "coats", "camera", "soldier", "battle", "queen", "foolish", "funny", "brave", "awesome", "blue", "line", "brilliant", "observe", "observing", "discover", "spain", "star", "towel", "towards", "forward", "medium", "broke", "role", "room", "swim", "plant", "tree", "power", "food", "town", "cartoon", "bubble", "jungle", "forest", "mountain", "capital", "west", "east", "north", "south", "practice", "breeze", "wind", "rain", "pain", "happy", "happiness", "gloomy", "clown", "crown", "wink", "truck", "motor", "jump", "waves", "asteroid", "galaxy", "jupiter", "neptune", "mars", "pluto", "cold", "month", "year", "costly", "week", "powerful", "gymnastic", "thousand", "hundered", "popular", "popularity", "defence", "tank", "scary", "lion", "zebra", "giraffe", "donkey", "infection", "gibberish", "farm", "machine", "almost", "nearly", "viking", "vampire", "robot", "inteligent", "crowd", "ability", "aboard", "about", "above", "accept", "accident", "according", "account", "accurate", "acres", "across", "action", "active", "activity", "actual", "actually", "addition", "additional", "adjective", "adult", "adventure", "advice", "affect", "afraid", "after", "afternoon", "again", "against", "agree", "ahead", "airplane", "alike", "alive", "allow", "almost", "alone", "along", "aloud", "alphabet", "already", "although", "among", "amount", "ancient", "angle", "angry", "animal", "announced", "another", "answer", "anybody", "anyone", "anything", "anyway", "anywhere", "apart", "apartment", "appearance", "apple", "applied", "appropriate", "around", "arrange", "arrangement", "arrive", "arrow", "article", "aside", "asleep", "atmosphere", "atomic", "attached", "attack", "attempt", "attention", "audience", "author", "automobile", "available", "average", "avoid", "aware", "badly", "balance", "balloon", "baseball", "basic", "basis", "basket", "battle", "beautiful", "beauty", "became", "because", "become", "becoming", "before", "began", "beginning", "begun", "behavior", "behind", "being", "believed", "belong", "below", "beneath", "beside", "better", "between", "beyond", "bicycle", "bigger", "biggest", "birds", "birth", "birthday", "black", "blank", "blanket", "blind", "block", "blood", "board", "border", "bottle", "bottom", "bound", "brain", "branch", "brass", "brave", "bread", "break", "breakfast", "breath", "breathe", "breathing", "breeze", "brick", "bridge", "brief", "bright", "bring", "broad", "broke", "broken", "brother", "brought", "brown", "brush", "buffalo", "build", "building", "built", "buried", "burst", "business", "butter", "cabin", "camera", "canal", "cannot", "capital", "captain", "captured", "carbon", "careful", "carefully", "carried", "carry", "castle", "catch", "cattle", "caught", "cause", "center", "central", "century", "certain", "certainly", "chain", "chair", "chamber", "chance", "change", "changing", "chapter", "character", "characteristic", "charge", "chart", "check", "cheese", "chemical", "chest", "chicken", "chief", "child", "children", "choice", "choose", "chose", "chosen", "church", "circle", "circus", "citizen", "class", "classroom", "claws", "clean", "clear", "clearly", "climate", "climb", "clock", "close", "closely", "closer", "cloth", "clothes", "clothing", "cloud", "coach", "coast", "coffee", "collect", "college", "colony", "color", "column", "combination", "combine", "comfortable", "coming", "command", "common", "community", "company", "compare", "compass", "complete", "completely", "complex", "composed", "composition", "compound", "concerned", "condition", "congress", "connected", "consider", "consist", "consonant", "constantly", "construction", "contain", "continent", "continued", "contrast", "control", "conversation", "cookies", "copper", "corner", "correct", "correctly", "cotton", "could", "count", "country", "couple", "courage", "course", "court", "cover", "cowboy", "crack", "cream", "create", "creature", "cross", "crowd", "curious", "current", "curve", "customs", "cutting", "daily", "damage", "dance", "danger", "dangerous", "darkness", "daughter", "death", "decide", "declared", "deeply", "definition", "degree", "depend", "depth", "describe", "desert", "design", "detail", "determine", "develop", "development", "diagram", "diameter", "differ", "difference", "different", "difficult", "difficulty", "dinner", "direct", "direction", "directly", "dirty", "disappear", "discover", "discovery", "discuss", "discussion", "disease", "distance", "distant", "divide", "division", "doctor", "doing", "dollar", "donkey", "double", "doubt", "dozen", "drawn", "dream", "dress", "dried", "drink", "drive", "driven", "driver", "driving", "dropped", "drove", "during", "eager", "earlier", "early", "earth", "easier", "easily", "eaten", "education", "effect", "effort", "eight", "either", "electric", "electricity", "element", "elephant", "eleven", "empty", "enemy", "energy", "engine", "engineer", "enjoy", "enough", "enter", "entire", "entirely", "environment", "equal", "equally", "equator", "equipment", "escape", "especially", "essential", "establish", "evening", "event", "eventually", "every", "everybody", "everyone", "everything", "everywhere", "evidence", "exact", "exactly", "examine", "example", "excellent", "except", "exchange", "excited", "excitement", "exciting", "exclaimed", "exercise", "exist", "expect", "experience", "experiment", "explain", "explanation", "explore", "express", "expression", "extra", "facing", "factor", "factory", "failed", "fairly", "fallen", "familiar", "family", "famous", "farmer", "farther", "fastened", "faster", "father", "favorite", "feathers", "feature", "fellow", "fence", "fewer", "field", "fierce", "fifteen", "fifth", "fifty", "fight", "fighting", "figure", "final", "finally", "finest", "finger", "finish", "fireplace", "first", "flame", "flies", "flight", "floating", "floor", "flower", "folks", "follow", "football", "force", "foreign", "forest", "forget", "forgot", "forgotten", "former", "forth", "forty", "forward", "fought", "found", "fourth", "frame", "freedom", "frequently", "fresh", "friend", "friendly", "frighten", "front", "frozen", "fruit", "fully", "function", "funny", "furniture", "further", "future", "garage", "garden", "gasoline", "gather", "general", "generally", "gentle", "gently", "getting", "giant", "given", "giving", "glass", "globe", "golden", "goose", "government", "grabbed", "grade", "gradually", "grain", "grandfather", "grandmother", "graph", "grass", "gravity", "great", "greater", "greatest", "greatly", "green", "ground", "group", "grown", "growth", "guard", "guess", "guide", "habit", "halfway", "handle", "handsome", "happen", "happened", "happily", "happy", "harbor", "harder", "hardly", "having", "headed", "heading", "health", "heard", "hearing", "heart", "heavy", "height", "hello", "helpful", "herself", "hidden", "higher", "highest", "highway", "himself", "history", "hollow", "honor", "horse", "hospital", "house", "however", "human", "hundred", "hungry", "hunter", "hurried", "hurry", "husband", "identity", "image", "imagine", "immediately", "importance", "important", "impossible", "improve", "include", "including", "income", "increase", "indeed", "independent", "indicate", "individual", "industrial", "industry", "influence", "information", "inside", "instance", "instant", "instead", "instrument", "interest", "interior", "introduced", "invented", "involved", "island", "itself", "joined", "journey", "judge", "jungle", "kitchen", "knife", "knowledge", "known", "label", "labor", "language", "large", "larger", "largest", "later", "laugh", "layers", "leader", "learn", "least", "leather", "leave", "leaving", "length", "lesson", "letter", "level", "library", "light", "likely", "limited", "liquid", "listen", "little", "living", "local", "locate", "location", "lonely", "longer", "loose", "lovely", "lower", "lucky", "lunch", "lungs", "lying", "machine", "machinery", "magic", "magnet", "mainly", "major", "making", "managed", "manner", "manufacturing", "market", "married", "massage", "master", "material", "mathematics", "matter", "maybe", "means", "meant", "measure", "medicine", "melted", "member", "memory", "mental", "merely", "metal", "method", "middle", "might", "mighty", "military", "minerals", "minute", "mirror", "missing", "mission", "mistake", "mixture", "model", "modern", "molecular", "moment", "money", "monkey", "month", "morning", "mostly", "mother", "motion", "motor", "mountain", "mouse", "mouth", "movement", "movie", "moving", "muscle", "music", "musical", "myself", "mysterious", "nails", "nation", "national", "native", "natural", "naturally", "nature", "nearby", "nearer", "nearest", "nearly", "necessary", "needed", "needle", "needs", "negative", "neighbor", "neighborhood", "nervous", "never", "newspaper", "night", "nobody", "nodded", "noise", "north", "noted", "nothing", "notice", "number", "numeral", "object", "observe", "obtain", "occasionally", "occur", "ocean", "offer", "office", "officer", "official", "older", "oldest", "operation", "opinion", "opportunity", "opposite", "orange", "orbit", "order", "ordinary", "organization", "organized", "origin", "original", "other", "ought", "ourselves", "outer", "outline", "outside", "owner", "oxygen", "package", "paint", "palace", "paper", "paragraph", "parallel", "parent", "particles", "particular", "particularly", "partly", "parts", "party", "passage", "pattern", "peace", "pencil", "people", "percent", "perfect", "perfectly", "perhaps", "period", "person", "personal", "phrase", "physical", "piano", "picture", "pictured", "piece", "pilot", "pitch", "place", "plain", "plane", "planet", "planned", "planning", "plant", "plastic", "plate", "plates", "pleasant", "please", "pleasure", "plenty", "plural", "pocket", "poetry", "point", "police", "policeman", "political", "popular", "population", "porch", "position", "positive", "possible", "possibly", "potatoes", "pound", "powder", "power", "powerful", "practical", "practice", "prepare", "present", "president", "press", "pressure", "pretty", "prevent", "previous", "price", "pride", "primitive", "principal", "principle", "printed", "private", "prize", "probably", "problem", "process", "produce", "product", "production", "program", "progress", "promised", "proper", "properly", "property", "protection", "proud", "prove", "provide", "public", "pupil", "purple", "purpose", "putting", "quarter", "queen", "question", "quick", "quickly", "quiet", "quietly", "quite", "rabbit", "radio", "railroad", "raise", "ranch", "range", "rapidly", "rather", "reach", "reader", "ready", "realize", "reason", "recall", "receive", "recent", "recently", "recognize", "record", "refer", "refused", "region", "regular", "related", "relationship", "religious", "remain", "remarkable", "remember", "remove", "repeat", "replace", "replied", "report", "represent", "require", "research", "respect", "result", "return", "review", "rhyme", "rhythm", "riding", "right", "rising", "river", "rocket", "rocky", "rough", "round", "route", "rubbed", "rubber", "ruler", "running", "saddle", "safety", "salmon", "satellites", "satisfied", "saved", "scale", "scared", "scene", "school", "science", "scientific", "scientist", "score", "screen", "search", "season", "second", "secret", "section", "seeing", "seems", "seldom", "select", "selection", "sense", "sentence", "separate", "series", "serious", "serve", "service", "setting", "settle", "settlers", "seven", "several", "shade", "shadow", "shake", "shaking", "shall", "shallow", "shape", "share", "sharp", "sheep", "sheet", "shelf", "shells", "shelter", "shine", "shinning", "shirt", "shoot", "shore", "short", "shorter", "should", "shoulder", "shout", "shown", "sides", "sight", "signal", "silence", "silent", "silly", "silver", "similar", "simple", "simplest", "simply", "since", "single", "sister", "sitting", "situation", "skill", "slabs", "slave", "sleep", "slept", "slide", "slight", "slightly", "slipped", "slope", "slowly", "small", "smaller", "smallest", "smell", "smile", "smoke", "smooth", "snake", "social", "society", "softly", "solar", "soldier", "solid", "solution", "solve", "somebody", "somehow", "someone", "something", "sometime", "somewhere", "sound", "source", "south", "southern", "space", "speak", "special", "species", "specific", "speech", "speed", "spell", "spend", "spent", "spider", "spirit", "spite", "split", "spoken", "sport", "spread", "spring", "square", "stage", "stairs", "stand", "standard", "stared", "start", "state", "statement", "station", "steady", "steam", "steel", "steep", "stems", "stepped", "stick", "stiff", "still", "stock", "stomach", "stone", "stood", "stopped", "store", "storm", "story", "stove", "straight", "strange", "stranger", "straw", "stream", "street", "strength", "stretch", "strike", "string", "strip", "strong", "stronger", "struck", "structure", "struggle", "stuck", "student", "studied", "studying", "subject", "substance", "success", "successful", "sudden", "suddenly", "sugar", "suggest", "summer", "sunlight", "supper", "supply", "support", "suppose", "surface", "surprise", "surrounded", "sweet", "swept", "swimming", "swing", "swung", "syllable", "symbol", "system", "table", "taken", "tales", "taste", "taught", "teach", "teacher", "tears", "teeth", "telephone", "television", "temperature", "terrible", "thank", "themselves", "theory", "there", "therefore", "these", "thick", "thing", "think", "third", "thirty", "those", "though", "thought", "thousand", "thread", "three", "threw", "throat", "through", "throughout", "throw", "thrown", "thumb", "tight", "tightly", "tired", "title", "tobacco", "today", "together", "tomorrow", "tongue", "tonight", "topic", "total", "touch", "toward", "tower", "trace", "track", "trade", "traffic", "trail", "train", "transportation", "travel", "treated", "triangle", "tribe", "trick", "tried", "troops", "tropical", "trouble", "truck", "trunk", "truth", "twelve", "twenty", "twice", "typical", "uncle", "under", "underline", "understanding", "unhappy", "union", "universe", "unknown", "unless", "until", "unusual", "upper", "upward", "useful", "using", "usual", "usually", "valley", "valuable", "value", "vapor", "variety", "various", "vegetable", "vertical", "vessels", "victory", "village", "visit", "visitor", "voice", "volume", "vowel", "voyage", "wagon", "waste", "watch", "water", "wealth", "weather", "weigh", "weight", "welcome", "western", "whale", "whatever", "wheat", "wheel", "whenever", "where", "wherever", "whether", "which", "while", "whispered", "whistle", "white", "whole", "whose", "widely", "willing", "window", "winter", "within", "without", "women", "wonder", "wonderful", "wooden", "worker", "world", "worried", "worry", "worse", "worth", "would", "wrapped", "write", "writer", "writing", "written", "wrong", "wrote", "yellow", "yesterday", "young", "younger", "yourself", "youth", "zebra", "zipper"];
