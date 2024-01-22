exports.render = ({ meta, basics, skills, work }) => `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title>${basics.name} - ${basics.label}</title>
	<style>
		.font-sans-serif {
			font-family: "Open Sans", sans-serif;
		}
		
		.font-display {
			font-family: "Acme", sans-serif;
		}
		
		.font-monospace {
			font-family: "Source Code Pro", monospace;
		}
		
		.color-dark {
			color: #191919;
		}
		
		.color-gray {
			color: #2B2B2B;
		}

		.color-blue {
			color: #1AA8ED;
		}
		
		.color-light-gray {
			color: #6A6A6A;
		}
		
		.color-lighter-gray {
			color: #D9D9D9;
		}
		
		.color-white {
			color: #FFFFFF;
		}
		
		.color-highlight {
			color: #ED5F1A;
		}

		.skill.skill-highlighted {
			color: #1AA8ED !important;
		}

		.bg-cloud-tag {
			position: relative;
		}

		.bg-cloud-tag:before {
			content: ' ';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0.9;
			background-repeat: no-repeat;
			background-position: 0 50%;
			background-size: cover;
			background-color: #ffffff;
			background-image: url('data:image/svg+xml,<svg id="visual" viewBox="0 0 900 300" width="900" height="300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="900" height="300" fill="%23fff"></rect><path d="M0 53L39 52L78 54L117 22L157 63L196 130L235 94L274 96L313 26L352 60L391 152L430 53L470 88L509 113L548 82L587 108L626 123L665 130L704 87L743 126L783 94L822 48L861 31L900 59L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23ffffff"></path><path d="M0 64L39 162L78 133L117 161L157 60L196 89L235 156L274 90L313 44L352 54L391 127L430 56L470 152L509 95L548 154L587 79L626 55L665 158L704 49L743 128L783 76L822 46L861 129L900 74L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23fbfbfb"></path><path d="M0 72L39 171L78 96L117 125L157 122L196 75L235 155L274 102L313 135L352 137L391 84L430 148L470 92L509 143L548 79L587 139L626 154L665 131L704 155L743 180L783 120L822 106L861 145L900 114L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23f7f7f7"></path><path d="M0 176L39 85L78 152L117 182L157 185L196 96L235 161L274 128L313 92L352 93L391 83L430 192L470 173L509 116L548 184L587 91L626 190L665 129L704 181L743 118L783 188L822 84L861 188L900 130L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23f3f3f3"></path><path d="M0 135L39 172L78 181L117 154L157 151L196 118L235 170L274 151L313 149L352 155L391 201L430 160L470 191L509 108L548 197L587 194L626 129L665 111L704 149L743 142L783 199L822 167L861 130L900 110L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23efefef"></path><path d="M0 132L39 133L78 142L117 198L157 144L196 189L235 155L274 212L313 134L352 156L391 179L430 189L470 170L509 127L548 173L587 157L626 188L665 157L704 202L743 171L783 217L822 154L861 151L900 177L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23eeeeee"></path><path d="M0 160L39 177L78 153L117 180L157 217L196 157L235 154L274 172L313 175L352 172L391 190L430 211L470 195L509 175L548 218L587 227L626 202L665 187L704 226L743 153L783 166L822 224L861 209L900 182L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23eeeeee"></path><path d="M0 223L39 198L78 235L117 175L157 204L196 177L235 189L274 209L313 210L352 196L391 234L430 200L470 194L509 213L548 233L587 227L626 183L665 176L704 179L743 181L783 177L822 189L861 224L900 181L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23efefef"></path><path d="M0 241L39 247L78 228L117 193L157 237L196 236L235 234L274 201L313 233L352 219L391 236L430 230L470 255L509 227L548 219L587 238L626 219L665 197L704 200L743 209L783 198L822 230L861 193L900 194L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23f3f3f3"></path><path d="M0 254L39 233L78 220L117 260L157 232L196 217L235 234L274 219L313 248L352 216L391 231L430 241L470 247L509 234L548 221L587 218L626 220L665 257L704 242L743 261L783 242L822 215L861 240L900 269L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23f7f7f7"></path><path d="M0 269L39 237L78 248L117 239L157 270L196 278L235 277L274 259L313 270L352 270L391 261L430 268L470 248L509 255L548 262L587 276L626 246L665 266L704 245L743 239L783 276L822 276L861 265L900 251L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23fbfbfb"></path><path d="M0 293L39 288L78 270L117 263L157 293L196 277L235 291L274 262L313 283L352 279L391 278L430 283L470 278L509 266L548 286L587 290L626 277L665 264L704 259L743 263L783 291L822 259L861 259L900 293L900 301L861 301L822 301L783 301L743 301L704 301L665 301L626 301L587 301L548 301L509 301L470 301L430 301L391 301L352 301L313 301L274 301L235 301L196 301L157 301L117 301L78 301L39 301L0 301Z" fill="%23ffffff"></path></svg>');
		}

		.bg-first-page {
			position: relative;
			height: 30px;
			width: auto;
		}

		.bg-first-page:before {
			content: ' ';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0.4;
			background-repeat: no-repeat;
			background-position: 0 50%;
			background-size: cover;
			background-color: #ffffff;
			background-image: url('data:image/svg+xml,<svg id="visual" viewBox="0 0 900 30" width="900" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="900" height="30" fill="%23fff"></rect><path d="M0 9L4.8 9C9.7 9 19.3 9 29 9.8C38.7 10.7 48.3 12.3 58 12.3C67.7 12.3 77.3 10.7 87 10.7C96.7 10.7 106.3 12.3 116 12.5C125.7 12.7 135.3 11.3 145 11.7C154.7 12 164.3 14 174 14.8C183.7 15.7 193.3 15.3 203 15.3C212.7 15.3 222.3 15.7 232 15.3C241.7 15 251.3 14 261 14C270.7 14 280.3 15 290 14.3C299.7 13.7 309.3 11.3 319 10C328.7 8.7 338.3 8.3 348 9.3C357.7 10.3 367.3 12.7 377 13.3C386.7 14 396.3 13 406 13.3C415.7 13.7 425.3 15.3 435.2 15C445 14.7 455 12.3 464.8 12.7C474.7 13 484.3 16 494 17C503.7 18 513.3 17 523 15.3C532.7 13.7 542.3 11.3 552 10.2C561.7 9 571.3 9 581 10.2C590.7 11.3 600.3 13.7 610 14.5C619.7 15.3 629.3 14.7 639 13.5C648.7 12.3 658.3 10.7 668 11.3C677.7 12 687.3 15 697 16.8C706.7 18.7 716.3 19.3 726 19.2C735.7 19 745.3 18 755 16C764.7 14 774.3 11 784 10.2C793.7 9.3 803.3 10.7 813 11.7C822.7 12.7 832.3 13.3 842 13.2C851.7 13 861.3 12 871 12.2C880.7 12.3 890.3 13.7 895.2 14.3L900 15L900 0L895.2 0C890.3 0 880.7 0 871 0C861.3 0 851.7 0 842 0C832.3 0 822.7 0 813 0C803.3 0 793.7 0 784 0C774.3 0 764.7 0 755 0C745.3 0 735.7 0 726 0C716.3 0 706.7 0 697 0C687.3 0 677.7 0 668 0C658.3 0 648.7 0 639 0C629.3 0 619.7 0 610 0C600.3 0 590.7 0 581 0C571.3 0 561.7 0 552 0C542.3 0 532.7 0 523 0C513.3 0 503.7 0 494 0C484.3 0 474.7 0 464.8 0C455 0 445 0 435.2 0C425.3 0 415.7 0 406 0C396.3 0 386.7 0 377 0C367.3 0 357.7 0 348 0C338.3 0 328.7 0 319 0C309.3 0 299.7 0 290 0C280.3 0 270.7 0 261 0C251.3 0 241.7 0 232 0C222.3 0 212.7 0 203 0C193.3 0 183.7 0 174 0C164.3 0 154.7 0 145 0C135.3 0 125.7 0 116 0C106.3 0 96.7 0 87 0C77.3 0 67.7 0 58 0C48.3 0 38.7 0 29 0C19.3 0 9.7 0 4.8 0L0 0Z" fill="%23D9D9D9" stroke-linecap="round" stroke-linejoin="miter"></path></svg>');
		}

		.bg-side-page {
			position: relative;
		}

		.bg-side-page:before {
			content: ' ';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-repeat: no-repeat;
			background-position: 0 0;
			background-size: cover;
			background-color: #ffffff;
			/*
			background-image: url('data:image/svg+xml,<svg id="visual" viewBox="0 0 800 1200" width="800" height="1200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="800" height="1200" fill="%23fff"></rect><path d="M600 1200L583 1200L583 1156L523 1156L523 1111L666 1111L666 1067L724 1067L724 1022L682 1022L682 978L791 978L791 933L706 933L706 889L699 889L699 844L792 844L792 800L646 800L646 756L628 756L628 711L548 711L548 667L734 667L734 622L706 622L706 578L782 578L782 533L739 533L739 489L599 489L599 444L637 444L637 400L727 400L727 356L556 356L556 311L659 311L659 267L649 267L649 222L705 222L705 178L675 178L675 133L627 133L627 89L486 89L486 44L611 44L611 0L800 0L800 44L800 44L800 89L800 89L800 133L800 133L800 178L800 178L800 222L800 222L800 267L800 267L800 311L800 311L800 356L800 356L800 400L800 400L800 444L800 444L800 489L800 489L800 533L800 533L800 578L800 578L800 622L800 622L800 667L800 667L800 711L800 711L800 756L800 756L800 800L800 800L800 844L800 844L800 889L800 889L800 933L800 933L800 978L800 978L800 1022L800 1022L800 1067L800 1067L800 1111L800 1111L800 1156L800 1156L800 1200L800 1200Z" fill="%23fcfcfc" stroke-linecap="square" stroke-linejoin="miter"></path></svg>');
			*/
			background-image: url('data:image/svg+xml,<svg id="visual" viewBox="0 0 800 1200" width="800" height="1200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="800" height="1200" fill="%23fff"></rect><path d="M600 1200L583 1200L583 1156L523 1156L523 1111L666 1111L666 1067L724 1067L724 1022L682 1022L682 978L791 978L791 933L706 933L706 889L699 889L699 844L792 844L792 800L646 800L646 756L628 756L628 711L548 711L548 667L734 667L734 622L706 622L706 578L782 578L782 533L739 533L739 489L599 489L599 444L637 444L637 400L727 400L727 356L556 356L556 311L659 311L659 267L649 267L649 222L705 222L705 178L675 178L675 133L627 133L627 89L486 89L486 44L611 44L611 0L800 0L800 44L800 44L800 89L800 89L800 133L800 133L800 178L800 178L800 222L800 222L800 267L800 267L800 311L800 311L800 356L800 356L800 400L800 400L800 444L800 444L800 489L800 489L800 533L800 533L800 578L800 578L800 622L800 622L800 667L800 667L800 711L800 711L800 756L800 756L800 800L800 800L800 844L800 844L800 889L800 889L800 933L800 933L800 978L800 978L800 1022L800 1022L800 1067L800 1067L800 1111L800 1111L800 1156L800 1156L800 1200L800 1200Z" fill="%23000" stroke-linecap="square" stroke-linejoin="miter"></path></svg>');
		}
	</style>

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/jqcloud2@2.0.3/dist/jqcloud.min.js"></script>

	<style>
		.jqcloud {
			font-family: "Source Code Pro", monospace;
			line-height: normal;
			text-shadow: 18px 25px 16px rgba(43, 43, 43, 0.05);
			overflow: hidden;
			position: relative;
		}
		
		.jqcloud-word {
			margin: 0;
			padding: 5px;
		}
		.jqcloud-word.w1 {
			color: #191919;
			font-size: 60%;
			transform: rotate(5deg);
			font-weight: 300;
			text-style: italic;
		}
		.jqcloud-word.w2 {
			color: #191919;
			font-size: 65%;
			transform: rotate(-1deg);
			font-weight: 300;
		}
		.jqcloud-word.w3 {
			color: #191919;
			font-size: 70%;
			transform: rotate(-2deg);
		}
		.jqcloud-word.w4 {
			color: #292929;
			font-size: 75%;
			transform: rotate(1deg);
			font-weight: 500;
		}
		.jqcloud-word.w5 {
			color: #292929;
			font-size: 80%;
			transform: rotate(1deg);
			font-weight: 600;
		}
		.jqcloud-word.w6 {
			color: #292929;
			font-size: 85%;
			transform: rotate(-5deg);
			font-weight: 300;
		}
		.jqcloud-word.w7 {
			color: #272727;
			font-size: 90%;
			transform: rotate(2deg);
			text-style: italic;
		}
		.jqcloud-word.w8 {
			color: #222222;
			font-size: 95%;
			transform: rotate(-1deg);
			font-weight: 500;
		}
		.jqcloud-word.w9 {
			color: #292929;
			font-size: 110%;
			transform: rotate(-1deg);
			font-weight: 600;
		}
		.jqcloud-word.w10 {
			color: #ED5F1A;
			font-size: 250%;
			font-weight: 700;
			text-style: italic;
			padding: 10px;
		}
	</style>

    <script type="text/javascript">
      	let word_array = [
		${skills
			.map((skill, index) => {
				let weight = skill.level;
				let skillCssClasses = [];

				if (!skill.meta.display) {
					return;
				}

				skillCssClasses.push(`skill`);
				skillCssClasses.push(`skill-${skill.name.toLowerCase().replace(/ /g, '-')}`);
				skillCssClasses.push(`skill-weight-${weight}`);

				if (skill.meta.highlighted) {
					skillCssClasses.push(`skill-highlighted`);	
				}

				return `${index !== 0 ? ',' : ''}{
					text: "${skill.name}", 
					weight: ${weight},
					html: {
						class: "${skillCssClasses.join(' ')}"
					}
				}`;
			})
			.join('')}
		];

		$(function() {
			$("#skills").jQCloud(word_array, {});
		});
    </script>

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Acme&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body class="font-sans-serif">
	<div class="mb-2 bg-first-page"></div>

	<div class="container-fluid p-0">

		<div class="row p-0 m-0">	
			<div class="col-3 p-0 m-0 ps-5">
				<div class="row p-0 m-0">
					<section class="col p-0 m-0 d-flex gap-1 align-items-center flex-column">
						<img src="${basics.picture}" height="150px" class="m-0 p-0 d-block rounded-circle shadow-4-strong" alt="${basics.name}">
					</section>
				</div>
			</div>
			<div class="col-9 p-0 m-0 pe-5">
				<div class="row p-0 m-0">
					<section class="col p-0 m-0 ps-3 ms-4 d-flex gap-1 justify-items-center flex-column">
						<div class="mb-3">
							<span class="font-monospace color-lighter-gray fs-6 fw-light fst-normal">&lt;</span><span class="font-monospace color-gray fs-6 fw-light fst-normal">${basics.label}</span><span class="font-monospace color-blue fs-6 fw-light fst-normal">/</span><span class="font-monospace color-lighter-gray fs-6 fw-light fst-normal">&gt;</span>
						</div>
						<p class="m-0 p-0 pe-3 d-block color-gray fw-light fst-normal">Hi, my name is <strong class="fw-bold fst-normal color-highlight">${basics.name}</strong> (BSc in Information Systems). ${basics.summary} <span class="color-highlight">♥</span></p>
					</section>
				</div>
			</div>
			<div class="col-12 p-0 m-0">
				<div class="row p-0 m-0">
					<div class="m-0 p-0 mt-3 btn-group d-flex justify-content-center flex-row">
						${basics.profiles
							.map(profile => `
							<a href="${profile.url}" class="btn btn-light fw-light fst-normal font-monospace color-gray">
								<i class="bi bi-${profile.network}"></i> <small>/${profile.username}</small>
							</a>
							`)
							.join('')}
						<a href="mailto:${basics.email}" class="btn btn-light fw-light fst-normal font-monospace color-gray">
							<i class="bi bi-envelope-fill"></i> <small>${basics.email}</small>
						</a>
						<a href="tel:${basics.phone.replace(/ /g, '').replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '')}" class="btn btn-light fw-light fst-normal font-monospace color-gray">
							<span><i class="bi bi-telephone-fill"></i> <small>${basics.phone}</small></span>
						</a>
					</div>
				</div>
			</div>

			<div class="col-12 p-0 m-0 mt-3 mb-2">
				<div class="row p-0 m-0">
					<div class="d-block separator"></div>

					<section class="col-12 p-0 m-0 mt-2">
						<h1 class="d-block text-capitalize font-monospace text-center color-highlight fs-5 fw-bold fst-normal">skills</h1>
						<small class="d-block font-monospace text-center color-gray fs-6 fw-light fst-normal">(some of the things I've been working with)</small>
						<div class="font-monospace color-highlight text-center m-0 p-0 mb-2">...</div>

						<div class="bg-cloud-tag">
							<div id="skills" style="height: 320px; width: 777px;"></div>
						</div>
					</section>
				</div>
			</div>

			<div class="col-12 p-0 m-0">
				<div class="row p-0 m-0">
					<div class="d-block separator"></div>

					<section class="col-12 p-0 m-0 mt-4">
						<h1 class="d-block text-capitalize font-monospace text-center color-highlight fs-5 fw-bold fst-normal">latest work experience</h1>
						<small class="d-block font-monospace text-center color-gray fs-6 fw-light fst-normal">(you can check my linkedin profile to see them all)</small>
						<div class="font-monospace color-highlight text-center m-0 p-0 mb-3">...</div>
						${work
							.map((work, index) => {
								let period = work.endDate 
									? `${new Date(work.startDate).getFullYear()} - ${new Date(work.endDate).getFullYear()}` 
									: `${new Date(work.startDate).getFullYear()} - Present`;

								return `
									<div class="row p-0 m-0 ms-4 me-5 mt-3 align-items-center d-flex">
										
										<div class="col-12 p-0 m-0">
											<div>
												<span class="font-monospace color-highlight fs-6 fw-light fst-normal">&lt;?php&nbsp;</span><span class="font-monospace color-light-gray fs-6 fw-light fst-normal">// ${period}</span>
											</div>
											<div>
												<span class="font-monospace color-blue fs-6 fw-light fst-normal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;echo</span><span class="font-monospace color-lighter-gray fs-6 fw-light fst-normal">&nbsp;"</span><span class="font-monospace color-dark fs-6 fw-light fst-normal">${work.position} at ${work.company}</span><span class="font-monospace color-lighter-gray fs-6 fw-light fst-normal">"</span><span class="font-monospace color-lighter-gray fs-6 fw-light fst-normal">;</span>
											</div>
										</div>
										
										<div class="col-12 p-0 m-0 mt-2">
											<ul class="m-0 p-0 ms-5 ps-2">
												${work.highlights
													.map((highlight, index, array) => {
														let lastChar = (array.length - 1) === index ? '.' : ';';
														return `
															<li class="my-2 d-inline-block fw-light fst-normal">${highlight}${lastChar}</li>
														`;
													})
													.join('')}
											</ul>
										</div>
									</div>
								`;
							})
							.join('')}
					</section>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
`
