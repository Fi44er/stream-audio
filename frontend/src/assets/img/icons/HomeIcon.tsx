export const HomeIcon = ({color, stroke} : {color?: string, stroke?: string}) => (
	<svg width='800' height='800' viewBox='0 0 800 800' fill={color ? color : 'none'} xmlns='http://www.w3.org/2000/svg'>
		<path d='M733.335 406.798V457.501C733.335 587.528 733.335 652.545 694.281 692.938C655.231 733.335 592.375 733.335 466.668 733.335H333.335C207.627 733.335 144.773 733.335 105.72 692.938C66.668 652.545 66.668 587.528 66.668 457.501V406.798C66.668 330.518 66.668 292.377 83.9746 260.759C101.281 229.142 132.9 209.518 196.136 170.272L262.802 128.897C329.648 87.411 363.071 66.668 400.001 66.668C436.931 66.668 470.355 87.411 537.201 128.897L603.868 170.272C667.105 209.518 698.721 229.142 716.028 260.759' stroke={stroke ? stroke : 'none'} stroke-width='50' stroke-linecap='round'/>
		<path d='M500 600H300' stroke={stroke ? stroke : 'none'} stroke-width='50' stroke-linecap='round'/>
	</svg>
);
