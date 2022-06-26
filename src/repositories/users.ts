import users from '../models/users'

class UsersRepository {
  constructor() {}

  getProfile = (address: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user && user[0]) return user[0]
      else
        return {
          address: address,
          username: '',
          bio: '',
          twitter: '',
          website: '',
          photo: '',
        }
    })
  }

  updateProfile = async (
    address: String,
    username: String,
    bio: String,
    twitter: String,
    website: String,
    photo: String,
  ) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        const newUser = new users({
          address,
          username,
          bio,
          twitter,
          website,
          photo,
        })
        newUser.save()
        return newUser
      } else {
        if (user && user[0]) {
          user[0].username = username
          user[0].bio = bio
          user[0].twitter = twitter
          user[0].website = website
          if (photo) user[0].photo = photo
          user[0].save()
          return user[0]
        }
      }
    })
  }

  addBanner = async (address: String, banner: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const banners = user[0].banners
          if (banner) banners.push(banner)
          user[0].banners = banners
          user[0].save()
          return user[0]
        }
      }
    })
  }

  removeBanner = async (address: String, banner: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const banners = user[0].banners
          if (banner) {
            var filename = banner.substring(banner.lastIndexOf('/') + 1)
            filename = filename.substring(filename.lastIndexOf('\\') + 1)
            const idx = banners.indexOf('uploads\\' + filename)
            banners.splice(idx, 1)
          }
          user[0].banners = banners
          user[0].save()
          return user[0]
        }
      }
    })
  }

  addWatchlist = async (address: String, watchlist: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const watchlists = user[0].watchlists
          watchlists.push(watchlist)
          user[0].watchlists = watchlists
          user[0].save()
          return user[0]
        }
      }
    })
  }

  removeWatchlist = async (address: String, watchlist: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const watchlists = user[0].watchlists
          const idx = watchlists.indexOf(watchlist)
          watchlists.splice(idx, 1)
          user[0].watchlists = watchlists
          user[0].save()
          return user[0]
        }
      }
    })
  }

  addHiddenNFT = async (address: String, hiddenNFT: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const hiddenNFTs = user[0].hiddenNFTs
          hiddenNFTs.push(hiddenNFT)
          user[0].hiddenNFTs = hiddenNFTs
          user[0].save()
          return user[0]
        }
      }
    })
  }

  removeHiddenNFT = async (address: String, hiddenNFT: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const hiddenNFTs = user[0].hiddenNFTs
          const idx = hiddenNFTs.indexOf(hiddenNFT)
          hiddenNFTs.splice(idx, 1)
          user[0].hiddenNFTs = hiddenNFTs
          user[0].save()
          return user[0]
        }
      }
    })
  }

  addFollowing = async (address: String, following: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const followings = user[0].followings
          followings.push(following)
          user[0].followings = followings
          user[0].save()
          return user[0]
        }
      }
    })
  }

  removeFollowing = async (address: String, following: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const followings = user[0].followings
          const idx = followings.indexOf(following)
          followings.splice(idx, 1)
          user[0].followings = followings
          user[0].save()
          return user[0]
        }
      }
    })
  }
}

export default new UsersRepository()
