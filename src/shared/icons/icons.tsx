import { FC } from 'react';

export interface IIconProps {
	width?: string;
	height?: string;
	className?: string;
	fill?: string;
}

export const Dashboard: FC<IIconProps> = ({ height, width, className }) => {
	return (
		<svg width={width || '25'} height={height || '24'} viewBox='0 0 25 24' fill='none'>
			<g clipPath='url(#clip0_430_3677)'>
				<path
					d='M10.5 3.19998C8.9357 3.56262 7.49691 4.33718 6.33287 5.44332C5.16883 6.54946 4.32194 7.94689 3.88002 9.49066C3.43811 11.0344 3.41728 12.6683 3.81968 14.2229C4.22209 15.7774 5.03308 17.196 6.16854 18.3314C7.304 19.4669 8.72257 20.2779 10.2771 20.6803C11.8316 21.0827 13.4655 21.0619 15.0093 20.62C16.5531 20.178 17.9505 19.3311 19.0567 18.1671C20.1628 17.0031 20.9374 15.5643 21.3 14C21.3 13.7348 21.1946 13.4804 21.0071 13.2929C20.8196 13.1053 20.5652 13 20.3 13H13.5C12.9696 13 12.4609 12.7893 12.0858 12.4142C11.7107 12.0391 11.5 11.5304 11.5 11V3.99998C11.4876 3.88151 11.4517 3.76668 11.3946 3.66215C11.3375 3.55763 11.2601 3.46548 11.1671 3.39107C11.0741 3.31665 10.9672 3.26144 10.8527 3.22864C10.7382 3.19584 10.6183 3.1861 10.5 3.19998Z'
					stroke='#7A7C7F'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M15.5 3.5C16.7697 3.94708 17.923 4.6733 18.8748 5.62516C19.8267 6.57702 20.5529 7.73028 21 9H16.5C16.2348 9 15.9804 8.89464 15.7929 8.70711C15.6054 8.51957 15.5 8.26522 15.5 8V3.5Z'
					stroke='#7A7C7F'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_430_3677'>
					<rect width='24' height='24' fill='white' transform='translate(0.5)' />
				</clipPath>
			</defs>
		</svg>
	);
};

export const Gonext: FC<IIconProps> = ({ height, width, className }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width || '35'}
			height={height || '35'}
			className={className}
			viewBox='0 0 1024 1024'
			fill='none'
		>
			<rect width='1024' height='1024' fill='white' />
			<path
				d='M538.433 449.119V728.55H488.145C484.527 708.887 479.284 688.853 472.49 668.45C438.965 713.839 396.21 736.534 344.298 736.534C282.933 736.534 235.23 712.139 201.115 663.424C166.999 614.708 149.941 551.651 149.941 474.327C149.941 391.163 168.106 324.262 204.511 273.772C240.916 223.282 290.318 198 352.79 198C405.145 198 447.383 214.337 479.579 247.011C511.701 279.686 531.344 323.153 538.506 377.561L433.796 392.863C425.304 329.584 398.277 297.945 352.863 297.945C323.031 297.945 300.434 312.951 285.149 342.89C269.863 372.903 262.257 415.705 262.257 471.296C262.257 524.891 270.528 565.844 287.069 594.157C303.61 622.47 327.166 636.663 357.663 636.663C377.38 636.663 395.028 629.493 410.535 615.225C426.042 600.958 433.796 578.116 433.796 546.698H345.184V449.119H538.433Z'
				fill='#F47522'
			/>
			<path
				d='M722.304 333.872C775.324 333.872 816.676 353.166 846.361 391.68C876.046 430.195 890.963 478.467 890.963 536.349C890.963 593.492 875.529 641.173 844.663 679.317C813.796 717.462 772.813 736.534 721.639 736.534C672.09 736.534 632.436 717.684 602.751 679.909C573.066 642.134 558.149 593.64 558.149 534.427C558.149 493.325 564.869 458.433 578.309 429.751C591.748 401.069 610.135 377.857 633.544 360.263C656.952 342.669 686.49 333.872 722.304 333.872ZM725.036 408.535C705.541 408.535 690.92 416.888 681.099 433.595C671.278 450.302 666.33 483.567 666.33 533.318C666.33 579.003 671.056 611.751 680.434 631.711C689.813 651.596 704.508 661.576 724.371 661.576C741.799 661.576 755.829 653.074 766.61 636.146C777.391 619.144 782.782 586.839 782.782 539.084C782.782 488.299 778.056 453.85 768.53 435.739C759.004 417.554 744.531 408.535 725.036 408.535Z'
				fill='#F47522'
			/>
			<path
				d='M78 786.231L546.468 783.252L934.199 783.483V792.066L546.468 792.296L78 789.317V786.231Z'
				fill='url(#paint0_linear_85_17)'
			/>
			<path
				d='M890.115 751.32H896.069L946.941 786.463L899.927 825.111H894.259L933.127 787.536L890.115 751.32Z'
				fill='#F47522'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_85_17'
					x1='78'
					y1='792.403'
					x2='934.199'
					y2='792.403'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#F47522' stopOpacity='0' />
					<stop offset='0.203125' stopColor='#F47522' />
					<stop offset='0.875' stopColor='#F47522' />
					<stop offset='1' stopColor='#F47522' stopOpacity='0' />
				</linearGradient>
			</defs>
		</svg>
	);
};

export const Scaletech: FC<IIconProps> = ({ height, width, className }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width || '35'}
			height={height || '35'}
			className={className}
			viewBox='0 0 801 800'
			fill='none'
		>
			<rect width='800' height='800' transform='translate(0.5)' fill='white' />
			<rect
				width='182.636'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 100.5 399.963)'
				fill='#161D1E'
			/>
			<rect
				width='116.509'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 250.516 249.943)'
				fill='#161D1E'
			/>
			<rect
				width='66.0286'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 353.773 146.689)'
				fill='#161D1E'
			/>
			<rect
				width='182.636'
				height='19.4929'
				rx='9.74644'
				transform='matrix(-0.707108 0.707105 0.707109 0.707105 686.719 386.256)'
				fill='#161D1E'
			/>
			<rect
				width='116.509'
				height='19.4929'
				rx='9.74644'
				transform='matrix(-0.707108 0.707105 0.707109 0.707105 469.133 603.832)'
				fill='#161D1E'
			/>
			<rect
				width='66.0286'
				height='19.4929'
				rx='9.74644'
				transform='matrix(-0.707108 0.707105 0.707109 0.707105 536.695 536.266)'
				fill='#161D1E'
			/>
			<rect
				width='108.44'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 172.062 471.527)'
				fill='#161D1E'
			/>
			<rect
				width='175.256'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 264.258 379.328)'
				fill='#00A5CB'
			/>
			<rect
				width='96.7304'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 403.703 239.891)'
				fill='#161D1E'
			/>
			<rect
				width='74.9832'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 207.844 507.314)'
				fill='#161D1E'
			/>
			<rect
				width='116.411'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 276.867 438.279)'
				fill='#00A5CB'
			/>
			<rect
				width='182.636'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 378.742 336.418)'
				fill='#161D1E'
			/>
			<rect
				width='74.9832'
				height='19.4929'
				rx='9.74644'
				transform='matrix(-0.707108 0.707105 0.707109 0.707105 579.445 278.832)'
				fill='#161D1E'
			/>
			<rect
				width='116.411'
				height='19.4929'
				rx='9.74644'
				transform='matrix(-0.707108 0.707105 0.707109 0.707105 510.422 347.865)'
				fill='#00A5CB'
			/>
			<rect
				width='182.636'
				height='19.4929'
				rx='9.74644'
				transform='matrix(-0.707108 0.707105 0.707109 0.707105 408.547 449.727)'
				fill='#161D1E'
			/>
			<rect
				width='95.0575'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 243.625 543.092)'
				fill='#161D1E'
			/>
			<rect
				width='175.059'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 331.156 455.555)'
				fill='#00A5CB'
			/>
			<rect
				width='94.9591'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 476.516 310.205)'
				fill='#161D1E'
			/>
			<rect
				width='95.0575'
				height='19.4929'
				rx='9.74644'
				transform='matrix(-0.707108 0.707105 0.707109 0.707105 615.219 314.615)'
				fill='#161D1E'
			/>
			<rect
				width='175.059'
				height='19.4929'
				rx='9.74644'
				transform='matrix(-0.707108 0.707105 0.707109 0.707105 527.695 402.156)'
				fill='#00A5CB'
			/>
			<rect
				width='94.9591'
				height='19.4929'
				rx='9.74644'
				transform='matrix(-0.707108 0.707105 0.707109 0.707105 382.328 547.508)'
				fill='#161D1E'
			/>
			<rect
				width='424.216'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 136.281 435.746)'
				fill='#161D1E'
			/>
			<rect
				width='424.216'
				height='19.4929'
				rx='9.74644'
				transform='matrix(0.707108 -0.707105 0.707109 0.707105 350.969 650.43)'
				fill='#161D1E'
			/>
		</svg>
	);
};

export const VerifiedIcon: FC<IIconProps> = ({ height, width, className }) => {
	return (
		<svg
			fill='#228be6'
			viewBox='0 0 536.541 536.541'
			width={width || '15'}
			height={height || '15'}
			className={className}
		>
			<g id='SVGRepo_bgCarrier'></g>
			<g></g>
			<g id='SVGRepo_iconCarrier'>
				<g>
					<g>
						<path d='M496.785,152.779c-3.305-25.085-16.549-51.934-38.826-74.205c-22.264-22.265-49.107-35.508-74.186-38.813 c-11.348-1.499-26.5-7.766-35.582-14.737C328.111,9.626,299.764,0,268.27,0s-59.841,9.626-79.921,25.024 c-9.082,6.965-24.235,13.238-35.582,14.737c-25.08,3.305-51.922,16.549-74.187,38.813c-22.277,22.271-35.521,49.119-38.825,74.205 c-1.493,11.347-7.766,26.494-14.731,35.57C9.621,208.422,0,236.776,0,268.27s9.621,59.847,25.024,79.921 c6.971,9.082,13.238,24.223,14.731,35.568c3.305,25.086,16.548,51.936,38.825,74.205c22.265,22.266,49.107,35.51,74.187,38.814 c11.347,1.498,26.5,7.771,35.582,14.736c20.073,15.398,48.421,25.025,79.921,25.025s59.841-9.627,79.921-25.025 c9.082-6.965,24.234-13.238,35.582-14.736c25.078-3.305,51.922-16.549,74.186-38.814c22.277-22.27,35.521-49.119,38.826-74.205 c1.492-11.346,7.766-26.492,14.73-35.568c15.404-20.074,25.025-48.422,25.025-79.921c0-31.494-9.621-59.848-25.025-79.921 C504.545,179.273,498.277,164.126,496.785,152.779z M439.256,180.43L246.477,373.209l-30.845,30.846 c-8.519,8.52-22.326,8.52-30.845,0l-30.845-30.846l-56.665-56.658c-8.519-8.52-8.519-22.326,0-30.846l30.845-30.844 c8.519-8.519,22.326-8.519,30.845,0l41.237,41.236L377.561,118.74c8.52-8.519,22.326-8.519,30.846,0l30.844,30.845 C447.775,158.104,447.775,171.917,439.256,180.43z'></path>{' '}
					</g>
				</g>
			</g>
		</svg>
	);
};
export const DotIcon: FC<IIconProps> = ({ height, width, className, fill }) => {
	return (
		<svg
			width={width || '15'}
			height={height || '15'}
			className={className}
			fill={fill}
			viewBox='0 0 31.955 31.955'
		>
			<g>
				<path d='M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3   c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z' />
				<path d='M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416   C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375   C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672   C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137   C17.523,1.94,14.328,1.906,11.394,2.883z' />
				<circle cx='15.979' cy='15.977' r='6.117' />
			</g>
		</svg>
	);
};
