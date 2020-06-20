﻿using System;
using Domain;
using AutoMapper;

namespace Application.MainDTOs
{
    public class ActivityFactorMappingProfile : Profile
    {
        public ActivityFactorMappingProfile()
        {
            CreateMap<ActivityFactor, ActivityFactorDto>();
            CreateMap<Goal, GoalDto>();
            CreateMap<HeightUnit, HeightUnitDto>();
            CreateMap<Gender, GenderDto>();
            CreateMap<AppUser, UserInfoDto>().ForMember(u => u.Username, o => o.MapFrom(s => s.UserName));
            CreateMap<UserStat, UserStatsDto>();
        }
    }
}
