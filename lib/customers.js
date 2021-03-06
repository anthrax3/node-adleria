/**
 * Adleria bindings for nodejs
 * 
 * (c) 2015 Optimal Bits Sweden AB.
 * 
 */
/// <reference path="../typings/node/node.d.ts"/>
'use strict';

var request = require('request-promise');
var urlJoin = require('url-join');
var _ = require('lodash');

module.exports = function (auth, baseUrl, opts) {
  var url = urlJoin(baseUrl, 'customers');

  return {
    list: function(query){
      return request({
        url: url,
        method: 'GET',
        json: true,
        auth: auth,
        qs: query
      });
    },
    get:  function(id){
      return request({
        url: urlJoin(url, id),
        method: 'GET',
        json: true,
        auth: auth
      });
    },
    edit: function(id, args){
      return request({
        url: urlJoin(url, id),
        method: 'PUT',
        body: args,
        json: true,
        auth: auth
      });
    },
    create: function(args){
      return request({
        url: url,
        method: 'POST',
        body: args,
        json: true,
        auth: auth,
      });
    },
    adspaces: {
      create: function(customerId, args){
        return request({
          url: urlJoin(url, customerId, 'adspaces'),
          method: 'POST',
          body: args,
          json: true,
          auth: auth,
        });
      },
      list: function(customerId, filters){
        return request({
          url: urlJoin(url, customerId, 'adspaces'),
          method: 'GET',
          json: true,
          auth: auth,
          qs: filters
        });
      },
      edit: function(customerId, adspaceId, args){
        return request({
          url: urlJoin(url, customerId, 'adspaces', adspaceId),
          method: 'PUT',
          json: true,
          auth: auth,
          body: args
        });
      },
      get: function(customerId, adspaceId){
        return request({
          url: urlJoin(url, customerId, 'adspaces', adspaceId),
          method: 'GET',
          json: true,
          auth: auth
        });
      },
      delete: function(customerId, adspaceId){
        return request({
          url: urlJoin(url, customerId, 'adspaces', adspaceId),
          method: 'DELETE',
          json: true,
          auth: auth
        });
      },
      getCampaigns: function(customerId, adspaceId, status){
        return request({
          url: urlJoin(url, customerId, 'adspaces', adspaceId, 'campaigns'),
          method: 'GET',
          json: true,
          auth: auth,
          qs: {
            status: status
          }
        });
      },
      acceptCampaign: function(customerId, adspaceId, campaignId){
        console.log(urlJoin(url, customerId, 'adspaces', adspaceId, 'accept'))
        return request({
          url: urlJoin(url, customerId, 'adspaces', adspaceId, 'accept'),
          method: 'PUT',
          json: true,
          body:{
            campaignId: campaignId
          },
          auth: auth
        });
      },
      rejectCampaign: function(customerId, adspaceId, campaignId){
        return request({
          url: urlJoin(url, customerId, 'adspaces', adspaceId, 'reject'),
          method: 'PUT',
          json: true,
          body:{
            campaignId: campaignId
          },
          auth: auth
        });
      },
      getImpressions: function(customerId, adspaceId){
        return request({
          url: urlJoin(url, customerId, 'adspaces', adspaceId, 'impressions'),
          method: 'GET',
          json: true,
          auth: auth
        });
      },
      players: {
        create: function (customerId, adspaceId, player) {
          var data = _.pick(player, 'name');
          return request({
            url: urlJoin(url, customerId, 'adspaces', adspaceId, 'players'),
            method: 'POST',
            body: data,
            json: true,
            auth: auth
          });
        },
        assign: function (customerId, adspaceId, playerId) {
          return request({
            url: urlJoin(url, customerId, 'adspaces', adspaceId, 'players', playerId),
            method: 'PUT',
            auth: auth
          });
        },
        unassign: function (customerId, adspaceId, playerId) {
          return request({
            url: urlJoin(url, customerId, 'adspaces', adspaceId, 'players', playerId),
            method: 'DELETE',
            auth: auth
          });
        },
        list: function (customerId, adspaceId, qs) {
          return request({
            url: urlJoin(url, customerId, 'adspaces', adspaceId, 'players'),
            method: 'GET',
            json: true,
            auth: auth,
            qs: qs || {}
          });
        }
      }
    },
    payouts: {
      get: function(customerId, adspaceId, options){
        return request({
          url: urlJoin(url, customerId, 'payouts', adspaceId),
          method: 'GET',
          json: true,
          auth: auth,
          qs: options
        });
      },
      list: function(customerId, filters){
        return request({
          url: urlJoin(url, customerId, 'payouts'),
          method: 'GET',
          json: true,
          auth: auth,
          qs: filters
        });
      }
    }
  }
}
