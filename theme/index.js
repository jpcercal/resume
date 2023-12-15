exports.render = ({ basics, work }) => `
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
		
		.color-light-gray {
			color: #D9D9D9;
		}
		
		.color-white {
			color: #FFFFFF;
		}
		
		.color-highlight {
			color: #ED5F1A;
		}
	</style>

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Acme&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body class="font-sans-serif">
	<div class="my-3 d-print-none"></div>
	<div class="container-fluid p-0 bg-light">

		<div class="row p-0 m-0">	
			<div class="col-3 p-0 m-0">
				<div class="row p-0 m-0">
					<section class="col p-0 m-0 d-flex gap-1 align-items-center flex-column">
						<img src="${basics.picture}" height="150px" class="m-0 p-0 d-block rounded-circle shadow-4-strong" alt="${basics.name}">
					</section>
				</div>
			</div>
			<div class="col-9 p-0 m-0">
				<div class="row p-0 m-0">
					<section class="col p-0 m-0 ms-4 d-flex gap-1 justify-items-center flex-column">
						<div class="mb-3">
							<span class="font-monospace color-light-gray fs-6 fw-light fst-normal">&lt;</span><span class="font-monospace color-gray fs-6 fw-light fst-normal">${basics.label}</span><span class="font-monospace color-light-gray fs-6 fw-light fst-normal">/</span><span class="font-monospace color-light-gray fs-6 fw-light fst-normal">&gt;</span>
						</div>
						<p class="m-0 p-0 d-block color-gray fw-light fst-normal">Hi, my name is <strong class="fw-bold fst-normal color-highlight">${basics.name}</strong> (BSc in Information Systems). ${basics.summary} <span class="color-highlight">♥</span></p>
					</section>
				</div>
			</div>
			<div class="col-12 p-0 m-0">
				<div class="row p-0 m-0">
					<ul class="m-0 p-0 mt-3 list-group d-flex justify-content-center flex-row list-group-horizontal">
						${basics.profiles
							.map(profile => `
							<li class="list-group-item">
								<div class="fw-light fst-normal font-monospace color-gray">
									<i class="bi bi-${profile.network}"></i> <small>/${profile.username}</small>
								</div>
							</li>
							`)
							.join('')}
						<li class="list-group-item">
							<div class="fw-light fst-normal font-monospace color-gray">
								<i class="bi bi-envelope-fill"></i> <small>${basics.email}</small>
							</div>
						</li>
						<li class="list-group-item">
							<div class="fw-light fst-normal font-monospace color-gray">
								<i class="bi bi-telephone-fill"></i> <small>${basics.phone}</small>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div class="col-12 p-0 m-0">
				<div class="row p-0 m-0">
					<div class="d-block separator"></div>

					<section class="col-12 p-0 m-0 mt-5">
						<h1 class="d-block text-capitalize font-monospace text-center color-highlight fs-5 fw-bold fst-normal">latest work experience</h1>
						<small class="d-block font-monospace text-center color-light-gray fs-6 fw-light fst-normal">(you can check my linkedin profile to see them all)</small>
						${work
							.map((work, index) => {
								let period = work.endDate 
									? `${new Date(work.startDate).getFullYear()} - ${new Date(work.endDate).getFullYear()}` 
									: `${new Date(work.startDate).getFullYear()} - Present`;

								return `
									${index !== 0 ? '' : '<div class="font-monospace color-highlight text-center m-0 p-0 mb-3">...</div>'}
										
									<div class="row p-0 m-0 mt-4 align-items-center d-flex">
										
										<div class="col-12 p-0 m-0">
											<div>
												<span class="font-monospace color-highlight fs-6 fw-light fst-normal">&lt;?php&nbsp;</span><span class="font-monospace color-light-gray fs-6 fw-light fst-normal">// ${period}</span>
											</div>
											<div>
												<span class="font-monospace color-light-gray fs-6 fw-light fst-normal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;echo "</span><span class="font-monospace color-dark fs-6 fw-light fst-normal">${work.position} at ${work.company}</span><span class="font-monospace color-light-gray fs-6 fw-light fst-normal">";</span>
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
