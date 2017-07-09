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
    let query = `select u.first_name as "rider", utwo.first_name as "driver", r.overall_rating, r.communication_rating,   r.driving_rating, r.accuracy_rating, r.written_review, t.departure_city, t.arrival_city from users u 
      join driver_reviews r on r.rider_id = u.id 
      join users utwo on utwo.id = r.driver_id 
      join trips t on t.id = r.trip_id
      where r.driver_id = ${driverID}`; 
    return db.raw(query).then((data) => data[0]);
  },

  getAverageRatingForDriver : (driverID) => {
    let query = `select avg(overall_rating) as 'overallRating', avg(communication_rating) as 'communicationRating', avg(driving_rating) as 'drivingRating', avg(accuracy_rating) as 'accuracyRating' from driver_reviews where driver_id = ${driverID}`;
    return db.raw(query).then((data) => data[0]);
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

