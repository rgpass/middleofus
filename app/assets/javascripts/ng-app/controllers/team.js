angular.module('myApp')
.controller('TeamCtrl', ['$scope', function ($scope) {
  var gerry = {
    name: "Gerry Pass",
    role: "Lead Developer",
    bio: "Gerry had a useful idea for how he could hack the planet, but being short on time, \
          he gave the idea to Chris and Amanda for their group project at General Assembly. \
          After seeing what they could accomplish, he asked them if they wanted to remake it \
          from scratch to continue their learning, and like that, MiddleOf.Us was born.",
    img: "assets/Gerry400.jpg"
  };
  var amanda = {
    name: 'Amanda Raymond',
    role: 'Developer',
    bio: "Amanda joined MiddleOf.Us excited to create, code, and collaborate. She is enjoying \
          advancing her full-stack skills and working with such a great team. Outside of \
          MiddleOf.Us and other coding ventures, Amanda likes traveling and going to concerts.",
    img: 'assets/Amanda400.jpg'
  }
  var chris = {
    name: 'Chris Markel',
    role: 'Developer',
    bio: "Chris joined MiddleOf.Us excited to recreate and improve upon its predecessor, \
          Connect.Us. He is enjoying sharpening his development skills while collaborating with \
          the team on core functionalities, UX, and design. When away from the code, Chris is \
          likely dabbling outdoors or spending time with his wife.",
    img: 'assets/Chris400.jpg'
  }
  var kevin = {
    name: 'Kevin Abdo',
    role: 'Product Manager',
    bio: "Kevin approached the MiddleOf.Us team to gain experience to product management within \
          the tech sector. Since then he has helped develop a vision for the site based on strong \
          functionality for users and intuitive designs. Outside of MiddleOf.Us, Kevin can be found \
          playing guitar in his rock band, The Better Brother.",
    img: 'assets/KA_400by400_2.jpg'
  }
  $scope.teamMembers = [gerry, amanda, chris, kevin];
}]);
