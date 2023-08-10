const errorMessages = {
	required: (field: string) => {
		return `${field} is required!`;
	},
	select: (field: string) => {
		return `please select ${field}`;
	},
	exactLength: (field: string, length: number) => {
		return `${field} must be having exact ${length} characters!`;
	},
	minLength: (field: string, length: number) => {
		return `${field} must be longer than ${length} characters!`;
	},
	minLengthArray: (field: string, length: number) => {
		return `${field} must contain minimum ${length} items!`;
	},
	maxLength: (field: string, length: number) => {
		return `${field} must be shorter than ${length} characters!`;
	},
	maxLengthArray: (field: string, length: number) => {
		return `${field} must contain maximum ${length} items!`;
	},
	minValue: (field: string, value: number) => {
		return `${field} must be greater than or equal to ${value}!`;
	},
	maxValue: (field: string, value: number) => {
		return `${field} must be less than or equal to ${value}!`;
	},
	validType: (field: string, type: string) => {
		return `${field} must be a valid ${type}!`;
	},
	passwordMatchValidate: () => {
		return 'Passwords do not match';
	},
	customPasswordMessage: () => {
		return 'Password must contain 1 Small Character, 1 Upper character, 1 special character and min length should be 8.';
	},
	lowerCase: () => {
		return 'Key should be in lowercase, uppercase, number and underscore';
	}
};

const onConfirmMessages = {
	confirmDelete: (field: string) => {
		return `Are you sure, you want to remove ${field}?`;
	},
	confirmLogout: 'Are you sure, you want to logout?'
};

export { errorMessages, onConfirmMessages };
