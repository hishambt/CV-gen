export interface PhoneNumber {
	Number: string;
	PhoneTypeName: string;
	Extension: string;
	Note?: any;
	PhoneType: number;
	IsRemoved: boolean;
	RegionCountryCode: string;
	PhoneCountryCode: string;
	FullPhoneNumber: string;
	Verified: boolean;
	IdentityId: number;
	ReceiveNotifications: boolean;
	LastModified: Date;
	CanVerifyReceiveNotification: boolean;
	IsUpdateLocked: boolean;
	IsVerificationLocked: boolean;
	CanUpdatePhoneNumber: boolean;
	CanResendMobileVerificationCode: boolean;
	Id: number;
	ReferenceSource?: any;
	ReferenceIdentity?: any;
}

export interface BillingAddress {
	AddressLine1: string;
	AddressLine2: string;
	AddressLine3: string;
	FullAddress: string;
	IdentityId: number;
	IsVerified: boolean;
	IsBusiness: boolean;
	CivicNumber?: any;
	StreetName1: string;
	StreetName2: string;
	CityName: string;
	Region: string;
	Country: number;
	StateOrProvince?: number;
	StateName: string;
	CountryName: string;
	PostalOrZipCode?: any;
	Latitude?: any;
	Longitude?: any;
	PrivateNote?: any;
	ExpiredDate?: any;
	FirstName: string;
	LastName: string;
	Company: string;
	ProfileNumber: number;
	EmailVerified?: boolean;
	InvoicingCompanyName?: any;
	FullName: string;
	EmailAddress: string;
	PhoneNumbers: PhoneNumber[];
	Id: number;
	ReferenceSource?: any;
	ReferenceIdentity?: any;
}

export interface PhoneNumberModel {
	Number: string;
	PhoneTypeName: string;
	Extension: string;
	Note?: any;
	PhoneType: number;
	IsRemoved: boolean;
	RegionCountryCode: string;
	PhoneCountryCode: string;
	FullPhoneNumber: string;
	Verified: boolean;
	IdentityId: number;
	ReceiveNotifications: boolean;
	LastModified: Date;
	CanVerifyReceiveNotification: boolean;
	IsUpdateLocked: boolean;
	IsVerificationLocked: boolean;
	CanUpdatePhoneNumber: boolean;
	CanResendMobileVerificationCode: boolean;
	Id: number;
	ReferenceSource?: any;
	ReferenceIdentity?: any;
}

export interface Details {
	VerificationToken?: any;
	VerifiedEmails: any;
}

export interface Data {
	BillingAddress: BillingAddress;
	LastOrderId?: number;
	PhoneNumbers: string[];
	LastOrderNumber: string;
	TotalOrderAmount: number;
	TotalOrders: number;
	FormRecords: any[];
	HasUserAccount: boolean;
	EmailConfirmed?: boolean;
	EnableImpersonation: boolean;
	CustomerId: number;
	Note?: any;
	UserId?: number;
	OverrideFullName?: any;
	FullName: string;
	Language?: any;
	LanguageName?: any;
	CompanyName: string;
	InvoicingCompanyName?: any;
	FirstName: string;
	LastName: string;
	EmailAddress: string;
	WebSite?: any;
	InternalNotes?: any;
	ProfileNumber: number;
	Image?: any;
	CreateDate: Date;
	PhoneNumberModels: PhoneNumberModel[];
	PrimaryLocation?: any;
	Occupation?: any;
	Gender?: any;
	GenderName?: any;
	IsLocked: boolean;
	IsDisabled: boolean;
	Tags?: any;
	Birthday?: any;
	LastModified: Date;
	TaxNumber?: any;
	EmailVerified: boolean;
	AccountVerified?: any;
	Details: Details;
	Id: number;
	ReferenceSource?: any;
	ReferenceIdentity?: any;
}

export interface CustomerState {
	Data: Data[];
	Count: number;
	HasData: boolean;
	SearchInfo?: any;
}
