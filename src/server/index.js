const express = require("express");
const path = require("path");

const app = express();

app.get("/", function(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.listen(2020, () => global.console.log(`

                                                    /
                                                  .7
                                       \\       , //
                                       |\\.--._/|//
                                      /\\ ) ) ).'/
                                     /(  \\  // /
                                    /(   J\`((_/ \\
                                   / ) | _\\     /
                                  /|)  \\  eJ    L
                                 |  \\ L \\   L   L
                                /  \\  J  \`. J   L
                                |  )   L   \\/   \\
                               /  \\    J   (\\   /
             _....___         |  \\      \\   \`\`\`
      ,.._.-'        '''--...-||\\     -. \\   \\
    .'.=.'                    \`         \`.\\ [ Y
   /   /                                  \\]  J
  Y / Y                                    Y   L
  | | |          \\                         |   L
  | | |           Y                        A  J
  |   I           |                       /I\\ /
  |    \\          I             \\        ( |]/|
  J     \\         /._           /        -tI/ |
   L     )       /   /'-------'J           \`'-:.
   J   .'      ,'  ,' ,     \\   \`'-.__          \\
    \\ T      ,'  ,'   )\\    /|        ';'---7   /
     \\|    ,'L  Y...-' / _.' /         \\   /   /
      J   Y  |  J    .'-'   /         ,--.(   /
       L  |  J   L -'     .'         /  |    /\\
       |  J.  L  J     .-;.-/       |    \\ .' /
       J   L\`-J   L____,.-'\`        |  _.-'   |
        L  J   L  J                  \`\`  J    |
        J   L  |   L                     J    |
         L  J  L    \\                    L    \\
         |   L  ) _.'\\                    ) _.'\\
         L    \\('\`    \\                  ('\`    \\
          ) _.'\`-....'                    \`-....'
         ('\`    \\
          \`-.___/

Server ready at http://localhost:2020`));
