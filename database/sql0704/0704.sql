ALTER TABLE sales 
ADD COLUMN ice INT 
REFERENCES ices(id);

ALTER TABLE sales 
ADD COLUMN sweet INT 
REFERENCES sweets(id);

ALTER TABLE sales
ALTER COLUMN topping 
TYPE VARCHAR 
USING topping::VARCHAR[], 
ALTER COLUMN taste TYPE VARCHAR 
USING taste::VARCHAR[];

ALTER TABLE aggregateSalesDay
ALTER COLUMN topping 
TYPE VARCHAR 
USING topping::VARCHAR[], 
ALTER COLUMN taste TYPE VARCHAR 
USING taste::VARCHAR[];

ALTER TABLE aggregateSalesDayCounty
ALTER COLUMN topping 
TYPE VARCHAR 
USING topping::VARCHAR[], 
ALTER COLUMN taste TYPE VARCHAR 
USING taste::VARCHAR[];

ALTER TABLE aggregateSalesDayRegion
ALTER COLUMN topping 
TYPE VARCHAR 
USING topping::VARCHAR[], 
ALTER COLUMN taste TYPE VARCHAR 
USING taste::VARCHAR[];

ALTER TABLE aggregateSalesDayDistrict
ALTER COLUMN topping 
TYPE VARCHAR 
USING topping::VARCHAR[], 
ALTER COLUMN taste TYPE VARCHAR 
USING taste::VARCHAR[];

ALTER TABLE aggregateSalesHour
ALTER COLUMN topping 
TYPE VARCHAR 
USING topping::VARCHAR[], 
ALTER COLUMN taste TYPE VARCHAR 
USING taste::VARCHAR[];

ALTER TABLE aggregateSalesHourRegion
ALTER COLUMN topping 
TYPE VARCHAR 
USING topping::VARCHAR[], 
ALTER COLUMN taste TYPE VARCHAR 
USING taste::VARCHAR[];

ALTER TABLE aggregateSalesHourCounty
ALTER COLUMN topping 
TYPE VARCHAR 
USING topping::VARCHAR[], 
ALTER COLUMN taste TYPE VARCHAR 
USING taste::VARCHAR[];

ALTER TABLE aggregateSalesHourDistrict
ALTER COLUMN topping 
TYPE VARCHAR 
USING topping::VARCHAR[], 
ALTER COLUMN taste TYPE VARCHAR 
USING taste::VARCHAR[];