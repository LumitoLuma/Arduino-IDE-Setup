#define AppName "Arduino Pro IDE"
#define AppVersion "0.1.2"
#define AppPublisher "Arduino LLC & Lumito"
#define AppExeName "Arduino Pro IDE.exe"

[Setup]
AppId={{0C7FAD7E-B753-4954-BC57-2E0EA127F116}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion}
VersionInfoVersion={#AppVersion}
AppCopyright=© 2020, {#AppPublisher}
AppPublisher={#AppPublisher}
AppPublisherURL="https://www.arduino.cc/pro/arduino-pro-ide"
AppSupportURL="https://github.com/arduino/arduino-pro-ide/issues"
AppUpdatesURL="https://github.com/arduino/arduino-pro-ide"
DefaultDirName={userappdata}\ArduinoProIDE
DirExistsWarning=yes
DisableWelcomePage=no
DisableProgramGroupPage=yes
UsedUserAreasWarning=no
LicenseFile=resources/LICENSE.txt
InfoBeforeFile=resources/Changelog.rtf
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=commandline
OutputDir=Release
OutputBaseFilename=Arduino-Pro.IDE.Setup
SetupIconFile=resources/app.ico
SolidCompression=yes
Compression=lzma2/ultra64
LZMANumBlockThreads=5
LZMADictionarySize=1048576
LZMANumFastBytes=273
LZMAUseSeparateProcess=yes
UninstallDisplayName={#AppName}
UninstallDisplayIcon="{app}\Arduino Pro IDE.exe,0"
WizardImageFile=resources/side.bmp
WizardSmallImageFile=resources/head.bmp

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Messages]
BeveledLabel=www.lumito.net

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode
Name: "installgit"; Description: "Install Git for Windows (Requires .NET Framework >= 4.0)"; Flags: unchecked

[Files]
Source: "arduino-pro-ide_{#AppVersion}_Windows_64bit\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "ISCompiler\Git-Installer.exe"; DestDir: "{app}\resources\app\Git"; Flags: ignoreversion recursesubdirs; Tasks: installgit

[UninstallDelete]
Type: filesandordirs; Name: "{app}";

[Icons]
Name: "{autoprograms}\{#AppName}"; Filename: "{app}\{#AppExeName}"
Name: "{autodesktop}\{#AppName}"; Filename: "{app}\{#AppExeName}"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#AppName}"; Filename: "{app}\{#AppExeName}"; Tasks: quicklaunchicon

[Run]
Filename: "{app}\{#AppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(AppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
Filename: "{app}\resources\app\Git\Git-Installer.exe"; Description: "Install Git for Windows"; Tasks: installgit; Flags: skipifsilent