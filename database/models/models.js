const bookshelf = require('../bookshelf.js').bookshelf;
const db = require('../bookshelf').knex;

const User = bookshelf.Model.extend({
  tableName: 'users',
  hostedTrips: function() {
    return this.hasMany(Trip,'driver_id');
  },
  trips: function() {
    return this.belongsToMany(Trip,'trips_toads');
  }
});

const Trip = bookshelf.Model.extend({
  tableName: 'trips',
  riders: function() {
    return this.belongsToMany(User,'trips_toads');
  },
  driver:function () {
    return this.belongsTo(User,'driver_id');
  }
});

const TripToad = bookshelf.Model.extend({
  tableName: 'trips_toads'
});

const reviews = {

  getAllUserData: (userID) =>  {
    let query = `select * from users where id = ${userID}`;
    return db.raw(query).then((data) => data[0][0]);
  },

  getAllReviewsForDriver: (driverID) => {
    let query = `select u.first_name as "rider", utwo.first_name as "driver", r.overall_rating, r.communication_rating,   r.driving_rating, r.accuracy_rating, r.written_review, r.add_date as "add_date", t.departure_city, t.arrival_city from users u 
      join driver_reviews r on r.rider_id = u.id 
      join users utwo on utwo.id = r.driver_id 
      join trips t on t.id = r.trip_id
      where r.driver_id = ${driverID}`; 
    return db.raw(query).then((data) => data[0]);
  },

  getAverageRatingForDriver : (driverID) => {
    let query = `select avg(overall_rating) as 'overallRating', avg(communication_rating) as 'communicationRating', avg(driving_rating) as 'drivingRating', avg(accuracy_rating) as 'accuracyRating' from driver_reviews where driver_id = ${driverID}`;
    return db.raw(query).then((data) => data[0]);
  },

  getOverallRatingForDriver: (driverID) => {
    let query = `select overall_rating from driver_reviews where driver_id = ${driverID}`;
    return db.raw(query).then((data) => data[0]);
  },

  getDriverID: (tripID) => {
    let query = `select driver_id from trips where id = ${tripID}`;
    return db.raw(query).then((data) => data[0]);
  },

  addReview: ({overallRating, accuracyRating, communicationRating, writtenReview, riderID, tripID, drivingRating}) => {

    return reviews.getDriverID(tripID)
    .then((data) => {

      let query = `INSERT INTO driver_reviews (rider_id, driver_id, overall_rating, communication_rating, driving_rating, accuracy_rating, written_review, trip_id) VALUES (${riderID}, ${data[0].driver_id}, ${overallRating}, ${communicationRating}, ${drivingRating}, ${accuracyRating}, "${writtenReview}", ${tripID})`;

      return db.raw(query).then((data) => data);
    });

  }
};

module.exports = {
  User: User,
  Users: User.collection(User),
  Trip: Trip,
  Trips: Trip.collection(Trip),
  TripToad: TripToad,
  TripToads: TripToad.collection(TripToad),
  Reviews: reviews
};

