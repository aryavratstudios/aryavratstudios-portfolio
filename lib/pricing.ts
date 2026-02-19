/**
 * Server-side pricing constants
 * These prices are used for validation - clients cannot set prices higher than base
 * Base prices are in USD
 */

export const SERVICE_BASE_PRICES: Record<string, number> = {
    // Video & Thumbnails
    "video_thumbnails": 35,
    "thumbnail": 35,
    "video_editing": 199,
    
    // Creative Research
    "creative_research": 49,
    "research": 49,
    
    // Web Development  
    "web_development": 299,
    "webdev": 299,
    "website": 299,
    "landing_page": 149,
    
    // UI/UX Design
    "ui_ux": 199,
    "uiux": 199,
    "design": 149,
    
    // Digital Marketing
    "digital_marketing": 149,
    "marketing": 149,
    "seo": 99,
    
    // Consulting
    "consulting": 199,
    
    // Default fallback
    "default": 35
};

/**
 * Get the base price for a service type
 */
export function getBasePrice(serviceType: string): number {
    const normalizedType = serviceType.toLowerCase().trim();
    
    // Try exact match first
    if (SERVICE_BASE_PRICES[normalizedType] !== undefined) {
        return SERVICE_BASE_PRICES[normalizedType];
    }
    
    // Try partial match
    for (const [key, price] of Object.entries(SERVICE_BASE_PRICES)) {
        if (normalizedType.includes(key) || key.includes(normalizedType)) {
            return price;
        }
    }
    
    // Return default
    return SERVICE_BASE_PRICES.default;
}

/**
 * Validate that the submitted price doesn't exceed the base price
 * Clients can only pay LESS than or equal to base price (deposit/discount scenarios)
 */
export function validatePrice(serviceType: string, submittedPrice: number): {
    valid: boolean;
    basePrice: number;
    message?: string;
} {
    const basePrice = getBasePrice(serviceType);
    
    if (submittedPrice > basePrice) {
        return {
            valid: false,
            basePrice,
            message: `Price cannot exceed base price of $${basePrice} for ${serviceType}`
        };
    }
    
    // Allow prices from $0 to base price (for deposits or freebies)
    if (submittedPrice < 0) {
        return {
            valid: false,
            basePrice,
            message: "Price cannot be negative"
        };
    }
    
    return {
        valid: true,
        basePrice
    };
}
