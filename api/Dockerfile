FROM mcr.microsoft.com/dotnet/sdk:6.0

ENV DOTNET_USE_POLLING_FILE_WATCHER 1

WORKDIR /src

RUN dotnet tool install --global dotnet-ef
RUN dotnet dev-certs https --trust

ENV PATH="$PATH:/root/.dotnet/tools"

COPY . .

EXPOSE 5257-7201

ENTRYPOINT ["dotnet", "watch", "run", "--urls","https://+:7201;http://+:5257;"]
